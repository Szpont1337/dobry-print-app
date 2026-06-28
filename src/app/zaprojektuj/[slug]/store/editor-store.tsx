"use client";

// Stan edytora = źródło prawdy. Dokument (EditorDoc) jest serializowalny i w
// pełni opisuje projekt; scena PixiJS jest tylko jego projekcją. Dzięki temu
// undo/redo, szablony i eksport sprowadzają się do operacji na zwykłych danych.
//
// Model interakcji:
//  • zmiany jednorazowe (przyciski, listy, toggle) → `commitNode` / akcje
//    z wbudowanym wpisem historii,
//  • gesty ciągłe (przeciąganie na canvasie, suwaki) → `beginInteraction()`
//    (jeden snapshot), potem `setNode(…, false)` bez historii, na końcu
//    `endInteraction()`.

import { createContext, useContext, useMemo, useReducer, useRef, type ReactNode } from "react";

import type { EditorDoc, PageBackground, SceneNode } from "../types";

const HISTORY_LIMIT = 80;

interface Editable {
  nodes: SceneNode[];
  background: PageBackground;
}

interface State {
  doc: EditorDoc;
  selectedId: string | null;
  past: Editable[];
  future: Editable[];
}

type ReorderTo = "up" | "down" | "top" | "bottom";

type Action =
  | { type: "LOAD"; doc: EditorDoc }
  | { type: "SELECT"; id: string | null }
  | { type: "SET_NODE"; id: string; patch: Partial<SceneNode> }
  | { type: "COMMIT_NODE"; id: string; patch: Partial<SceneNode> }
  | { type: "ADD"; node: SceneNode }
  | { type: "DELETE"; id: string }
  | { type: "DUPLICATE"; id: string; node: SceneNode }
  | { type: "REORDER"; id: string; to: ReorderTo }
  | { type: "SET_BG"; patch: Partial<PageBackground> }
  | { type: "REPLACE_NODES"; nodes: SceneNode[] }
  | { type: "UNDO" }
  | { type: "REDO" };

function snapshot(doc: EditorDoc): Editable {
  return {
    nodes: doc.nodes.map((n) => ({ ...n })),
    background: { ...doc.background },
  };
}

function pushPast(state: State): Editable[] {
  const next = [...state.past, snapshot(state.doc)];
  return next.length > HISTORY_LIMIT ? next.slice(-HISTORY_LIMIT) : next;
}

function patchNodes(nodes: SceneNode[], id: string, patch: Partial<SceneNode>): SceneNode[] {
  return nodes.map((n) => (n.id === id ? ({ ...n, ...patch } as SceneNode) : n));
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD":
      return { doc: action.doc, selectedId: null, past: [], future: [] };

    case "SELECT":
      return state.selectedId === action.id ? state : { ...state, selectedId: action.id };

    case "SET_NODE":
      return {
        ...state,
        doc: {
          ...state.doc,
          nodes: patchNodes(state.doc.nodes, action.id, action.patch),
        },
      };

    case "COMMIT_NODE":
      return {
        ...state,
        past: pushPast(state),
        future: [],
        doc: {
          ...state.doc,
          nodes: patchNodes(state.doc.nodes, action.id, action.patch),
        },
      };

    case "ADD":
      return {
        ...state,
        past: pushPast(state),
        future: [],
        selectedId: action.node.id,
        doc: { ...state.doc, nodes: [...state.doc.nodes, action.node] },
      };

    case "DELETE":
      return {
        ...state,
        past: pushPast(state),
        future: [],
        selectedId: null,
        doc: {
          ...state.doc,
          nodes: state.doc.nodes.filter((n) => n.id !== action.id),
        },
      };

    case "DUPLICATE":
      return {
        ...state,
        past: pushPast(state),
        future: [],
        selectedId: action.node.id,
        doc: { ...state.doc, nodes: [...state.doc.nodes, action.node] },
      };

    case "REORDER": {
      const idx = state.doc.nodes.findIndex((n) => n.id === action.id);
      if (idx < 0) return state;
      const nodes = [...state.doc.nodes];
      const [node] = nodes.splice(idx, 1);
      let to = idx;
      if (action.to === "up") to = Math.min(nodes.length, idx + 1);
      else if (action.to === "down") to = Math.max(0, idx - 1);
      else if (action.to === "top") to = nodes.length;
      else to = 0;
      nodes.splice(to, 0, node);
      return {
        ...state,
        past: pushPast(state),
        future: [],
        doc: { ...state.doc, nodes },
      };
    }

    case "SET_BG":
      return {
        ...state,
        past: pushPast(state),
        future: [],
        doc: {
          ...state.doc,
          background: { ...state.doc.background, ...action.patch },
        },
      };

    case "REPLACE_NODES":
      return {
        ...state,
        past: pushPast(state),
        future: [],
        selectedId: null,
        doc: { ...state.doc, nodes: action.nodes },
      };

    case "UNDO": {
      if (state.past.length === 0) return state;
      const prev = state.past[state.past.length - 1];
      const stillThere =
        state.selectedId != null && prev.nodes.some((n) => n.id === state.selectedId);
      return {
        ...state,
        past: state.past.slice(0, -1),
        future: [...state.future, snapshot(state.doc)],
        selectedId: stillThere ? state.selectedId : null,
        doc: {
          ...state.doc,
          nodes: prev.nodes.map((n) => ({ ...n })),
          background: { ...prev.background },
        },
      };
    }

    case "REDO": {
      if (state.future.length === 0) return state;
      const next = state.future[state.future.length - 1];
      const stillThere =
        state.selectedId != null && next.nodes.some((n) => n.id === state.selectedId);
      return {
        ...state,
        future: state.future.slice(0, -1),
        past: [...state.past, snapshot(state.doc)],
        selectedId: stillThere ? state.selectedId : null,
        doc: {
          ...state.doc,
          nodes: next.nodes.map((n) => ({ ...n })),
          background: { ...next.background },
        },
      };
    }

    default:
      return state;
  }
}

export interface EditorApi {
  doc: EditorDoc;
  selectedId: string | null;
  selectedNode: SceneNode | null;
  canUndo: boolean;
  canRedo: boolean;
  select: (id: string | null) => void;
  /** Mutacja bez wpisu historii — do gestów / suwaków. */
  setNode: (id: string, patch: Partial<SceneNode>) => void;
  /** Mutacja jednorazowa z wpisem historii. */
  commitNode: (id: string, patch: Partial<SceneNode>) => void;
  addNode: (node: SceneNode) => void;
  deleteNode: (id: string) => void;
  duplicateNode: (node: SceneNode) => void;
  reorder: (id: string, to: ReorderTo) => void;
  setBackground: (patch: Partial<PageBackground>) => void;
  replaceNodes: (nodes: SceneNode[]) => void;
  /** Otwiera transakcję (jeden snapshot na cały gest). Idempotentne. */
  beginInteraction: () => void;
  endInteraction: () => void;
  load: (doc: EditorDoc) => void;
  undo: () => void;
  redo: () => void;
}

const EditorContext = createContext<EditorApi | null>(null);

export function EditorProvider({
  initialDoc,
  children,
}: {
  initialDoc: EditorDoc;
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, {
    doc: initialDoc,
    selectedId: null,
    past: [],
    future: [],
  });

  // Flaga transakcji + leniwy snapshot: `beginInteraction` tylko UZBRAJA push,
  // a właściwy wpis historii bierzemy dopiero przy pierwszej realnej zmianie.
  // Dzięki temu samo wejście w pole (focus) bez edycji nie kasuje stosu redo
  // ani nie tworzy pustego kroku cofnięcia.
  const interactingRef = useRef(false);
  const pendingPushRef = useRef(false);

  const api = useMemo<EditorApi>(() => {
    const beginInteraction = () => {
      if (interactingRef.current) return;
      interactingRef.current = true;
      pendingPushRef.current = true;
    };
    return {
      doc: state.doc,
      selectedId: state.selectedId,
      selectedNode: state.doc.nodes.find((n) => n.id === state.selectedId) ?? null,
      canUndo: state.past.length > 0,
      canRedo: state.future.length > 0,
      select: (id) => dispatch({ type: "SELECT", id }),
      setNode: (id, patch) => {
        if (pendingPushRef.current) {
          // pierwsza zmiana w transakcji → snapshot stanu sprzed zmiany
          pendingPushRef.current = false;
          dispatch({ type: "COMMIT_NODE", id, patch });
        } else {
          dispatch({ type: "SET_NODE", id, patch });
        }
      },
      commitNode: (id, patch) => {
        pendingPushRef.current = false;
        dispatch({ type: "COMMIT_NODE", id, patch });
      },
      addNode: (node) => dispatch({ type: "ADD", node }),
      deleteNode: (id) => dispatch({ type: "DELETE", id }),
      duplicateNode: (node) => dispatch({ type: "DUPLICATE", id: node.id, node }),
      reorder: (id, to) => dispatch({ type: "REORDER", id, to }),
      setBackground: (patch) => dispatch({ type: "SET_BG", patch }),
      replaceNodes: (nodes) => dispatch({ type: "REPLACE_NODES", nodes }),
      beginInteraction,
      endInteraction: () => {
        interactingRef.current = false;
        pendingPushRef.current = false;
      },
      load: (doc) => dispatch({ type: "LOAD", doc }),
      undo: () => dispatch({ type: "UNDO" }),
      redo: () => dispatch({ type: "REDO" }),
    };
  }, [state]);

  return <EditorContext.Provider value={api}>{children}</EditorContext.Provider>;
}

export function useEditor(): EditorApi {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("useEditor musi być użyte wewnątrz <EditorProvider>");
  return ctx;
}
