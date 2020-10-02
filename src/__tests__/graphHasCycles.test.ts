import { hasCycles } from "../graphHasCycles";
import { PGraphNodeWithDependencies } from "../types";

test("Validate empty graph has no cycle", () => {
  const graph = new Map<string, PGraphNodeWithDependencies>();
  expect(hasCycles(graph)).toBe(false);
});

test("Validate graph has no cycle", () => {
  const graph = new Map<string, PGraphNodeWithDependencies>([
    createNode("putOnShirt", new Set()),
    createNode("putOnShorts", new Set()),
    createNode("putOnShoes", new Set("putOnShorts")),
  ]);
  expect(hasCycles(graph)).toBe(false);
});

test("Validate graph has a one node cycle", () => {
  const graph = new Map<string, PGraphNodeWithDependencies>([createNode("stuff", new Set("stuff"))]);
  expect(hasCycles(graph)).toBe(true);
});

test("Validate graph has a 2 node cycle", () => {
  const graph = new Map<string, PGraphNodeWithDependencies>([createNode("chicken", new Set("egg")), createNode("egg", new Set("chicken"))]);
  expect(hasCycles(graph)).toBe(true);
});

test("Validate graph has a cycle", () => {
  const graph = new Map<string, PGraphNodeWithDependencies>([
    createNode("putOnJacket", new Set("putOnShirt")),
    createNode("putOnShirt", new Set("putOnHat")),
    createNode("putOnHat", new Set("putOnJacket")),
  ]);
  expect(hasCycles(graph)).toBe(true);
});

test("Validate graph has a cycle complex", () => {
  const graph = new Map<string, PGraphNodeWithDependencies>([
    createNode("putOnJacket", new Set("putOnShirt")),
    createNode("putOnShirt", new Set("putOnHat")),
    createNode("putOnHat", new Set("putOnJacket")),
    createNode("putOnJacket", new Set("putOnShorts")),
    createNode("putOnShorts", new Set()),
    createNode("putonShirt", new Set("putOnShorts")),
  ]);
  expect(hasCycles(graph)).toBe(true);
});

const createNode = (name: string, dependsOn: Set<string>): [string, PGraphNodeWithDependencies] => {
  return [name, { dependsOn: new Set(), dependedOnBy: new Set(), run: async () => {} }];
};
