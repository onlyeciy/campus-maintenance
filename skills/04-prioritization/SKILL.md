---
name: 04-prioritization
description: Use this skill to prioritize software requirements — resolving stakeholder conflicts, mapping dependencies between requirements, classifying items with MoSCoW, weighing trade-offs, and recording the rationale behind each prioritization decision. Trigger whenever the user asks to "prioritize requirements," "rank the backlog," "apply MoSCoW," "decide what's in scope for this release," "resolve a conflict between stakeholders," or asks which requirements to cut, defer, or build first. Also trigger when the user has a specification (functional/non-functional requirements, user stories) and needs to decide order or inclusion for a release. Do NOT use for writing the requirements themselves (use the specification skill), for defining the business problem or scope (use the inception skill), or for sprint/release scheduling with dates and capacity — this skill decides relative priority and rationale, not a calendar.
---

# 04-prioritization 

## Purpose

This skill turns a list of requirements into a **prioritized, defensible plan**: which items are Must/Should/Could/Won't for this release, what depends on what, where stakeholders disagree and how that was resolved, what trade-offs were made, and — critically — *why* each call was made.

It exists because prioritization done poorly is either arbitrary (whoever shouted loudest wins) or invisible (a backlog gets reordered with no record of why), and both cause the same problem later: someone asks "why isn't X in this release?" and there's no defensible answer. This skill makes the reasoning behind prioritization a first-class, traceable artifact — not an afterthought.

## When to Use

Use this skill when:
- A user has a list of requirements, user stories, or backlog items and needs them classified by priority (e.g. MoSCoW) for an upcoming release or sprint.
- A user describes a disagreement between stakeholders about what matters most, and needs it analyzed and resolved with a documented rationale.
- A user needs dependencies between requirements mapped before sequencing work (e.g. "which of these needs to be built before the others?").
- A user is facing a trade-off (scope vs. timeline, one stakeholder's need vs. another's, cost vs. benefit) and wants the options and implications laid out before deciding.

Do NOT use this skill when the user wants:
- The requirements themselves drafted from needs — that's the specification phase; this skill assumes requirements already exist with IDs.
- Help defining the business problem, goals, or stakeholder list from scratch — that's inception; this skill assumes stakeholders and goals are already known or stated.
- A release calendar, sprint plan, or capacity-based schedule — this skill produces relative priority and rationale, not dates; scheduling is a separate planning activity that should consume this skill's output.

## Inputs

Gather or request as much of the following as possible before running this skill:

- **The requirements/items to prioritize**: ideally with IDs (FR-##, NFR-##, US-##) from a specification; a plain list is acceptable if no formal spec exists yet.
- **Stakeholders and their stated priorities**: who wants what, and what they've said matters most to them — especially where stakeholders may disagree.
- **Known dependencies**: any stated technical, business, or sequencing dependency between items (e.g. "B can't be built until A exists").
- **Constraints on this prioritization round**: release deadline, budget, team capacity, or any hard limit that forces trade-offs (without requiring a full schedule).
- **Prioritization framework preference**: MoSCoW is the default; note if the user wants a different scheme (e.g. value-vs-effort, weighted scoring) instead or in addition.

## Required Context

Before drafting, read and account for:
- **Any Specification document** referenced or produced earlier — every item being prioritized should trace to a requirement or story ID where one exists.
- **Any Inception document** referenced or produced earlier — goals and stakeholder list there inform whose priorities carry more weight for which kinds of decisions, and which goal each item serves.
- **Any prior prioritization decisions** for the same project, so a new round doesn't silently reverse an earlier call without flagging it as a change.

If no specification exists, proceed using the plain list or description the user provides, and note in Document Status that items aren't yet traced to formal requirement IDs.

## Workflow

1. **Inventory the items and map dependencies first.** Before assigning any priority, identify which items depend on which others (technical prerequisite, shared component, regulatory sequencing). Dependencies constrain priority — an item can't be "Must Have, build first" if it depends on something not yet prioritized at all.

2. **Surface stakeholder positions.** For each item, note which stakeholder(s) care about it and what they've said about its importance. Where two stakeholders want different things from the same item, or rank items differently, flag it explicitly as a conflict rather than averaging or guessing a compromise silently.

3. **Resolve conflicts with a stated rationale.** For each flagged conflict, decide (or present options for the user to decide) based on traceable criteria — business goal alignment, dependency constraints, risk, stated constraints — and write down which criterion drove the call. Never resolve a conflict by unstated preference.

4. **Classify each item using MoSCoW** (Must have / Should have / Could have / Won't have this time), or the user's specified framework. Apply it consistently: "Must have" means the release fails its purpose without it, not "would be nice and someone wants it."

5. **Identify trade-offs.** For Should/Could/Won't items, state explicitly what is gained and given up by that classification — what capability is delayed, what risk is accepted, what stakeholder expectation isn't met this round.

6. **Run the quality checks** listed below against the full draft before presenting it.

7. **Stop and ask for clarification** if conflicts can't be resolved on available information, or if dependencies are circular/unresolvable (see Failure Conditions).

## Output Format

Always produce a single Markdown document using this structure:

```markdown
# Prioritization: [Project/Release Name]

## 1. Dependency Map
| Item | Depends On | Notes |
|------|-----------|-------|
| FR-03 | FR-01 | Cannot reject a request before the request-list view exists |
| ... | ... | ... |
[If no dependencies exist, state: "No dependencies identified among these items."]

## 2. Stakeholder Conflicts
### Conflict 1: [Short description]
- Stakeholders involved: [who wants what]
- Positions: [A wants X, B wants Y]
- Resolution: [what was decided]
- Rationale: [the criterion used — goal alignment, dependency, risk, constraint]
[If no conflicts exist, state: "No conflicting stakeholder positions identified."]

## 3. MoSCoW Classification
| ID | Item | Classification | Rationale |
|----|------|----------------|-----------|
| FR-01 | ... | Must | [why — tie to goal, dependency, or constraint] |
| FR-02 | ... | Should | ... |
| FR-03 | ... | Could | ... |
| FR-04 | ... | Won't (this release) | ... |

## 4. Trade-offs
- [Item/decision]: gains [X], gives up [Y] — *accepted because [rationale]*
- ...

## 5. Decision Rationale Summary
[A short narrative tying the classifications together — what principle or priority order governed this round, e.g. "Items directly blocking the core approval workflow were prioritized Must; reporting and audit features were deferred to Should/Could given the year-end deadline constraint."]

## 6. Document Status
[One line on completeness, e.g.: "Based on specification FR-01 to FR-04 and stated CFO deadline constraint. NFR items not yet prioritized — pending performance/security input."]
```

If the user asks for only one part (e.g. "just resolve this one conflict" or "just give me the MoSCoW list"), produce only the relevant section(s).

## Rules

- Do not assign a priority without a stated rationale. "Must have" with no reason given is not usable output.
- Do not resolve a stakeholder conflict by silently picking a side — log the conflict, the positions, and the specific criterion used to resolve it (goal alignment, dependency, constraint, risk), even if the user makes the final call.
- Do not classify an item as "Must have" merely because a stakeholder insists — tie the classification to its effect on the release's core purpose, a hard dependency, or a stated constraint (legal, safety, contractual). If the only basis is stakeholder insistence, say so explicitly and let the user weigh it.
- Keep dependency mapping separate from priority classification — a dependency is a sequencing fact ("A must exist before B"), not a priority judgment. Map dependencies before assigning MoSCoW, since they constrain what's feasible.
- Do not invent a dependency, conflict, or constraint that wasn't stated or reasonably inferable from provided material.
- State every trade-off in terms of both what is gained and what is given up — a trade-off described as only a benefit, or only a cost, is incomplete.
- Use the requirement/story IDs from the specification (FR-##, NFR-##, BR-##, US-##) when they exist, rather than re-describing items in new language that breaks traceability.

## Quality Checks

Before presenting the document, verify:
- **Complete**: every item provided for prioritization has a classification, even if "Won't have this time" with a stated reason.
- **Consistent**: no "Must have" item depends on a "Won't have" item without that contradiction being flagged; no two classifications for related items contradict the stated decision rationale.
- **Unambiguous**: each rationale is a specific, concrete reason — not "this seems important."
- **Traceable**: every classification, conflict resolution, and trade-off cites the item ID and the criterion behind the decision.
- **Dependency-aware**: priority order respects the dependency map — nothing is sequenced ahead of something it depends on.
- **Has business value framing**: the Decision Rationale Summary connects classifications back to the project's goals or constraints, not just a per-item justification in isolation.

If any check fails, fix the draft before presenting it.

## Failure Conditions

Stop and ask the user for clarification — rather than producing a full output — when:
- **No items or basis for prioritization are given at all** (e.g., the user says "prioritize my backlog" with no list provided). Ask for the items before classifying anything.
- **A dependency cycle exists** (A depends on B, B depends on A) with no information to break it — point out the cycle and ask which dependency is actually correct rather than guessing.
- **A stakeholder conflict cannot be resolved on any stated criterion** (no goal, constraint, or dependency favors either side, and the user hasn't indicated who has final say) — present the conflict and ask the user to decide or provide the missing criterion, rather than picking arbitrarily.

Do NOT stop for ordinary ambiguity — an item with an unclear dependency, a stakeholder preference with weak justification, or a classification that's a judgment call are normal at this phase and should be resolved with the best available rationale, clearly flagged as a judgment call if evidence is thin. The bar for stopping is "no information exists to make this call, or the inputs are structurally contradictory," not "the call required weighing several different things."

## Example Invocation

> "Here are our requirements for the expense tool: FR-01 (list pending requests), FR-02 (notify on submission), FR-03 (reject with reason), FR-04 (audit history). The CFO wants this done by year-end. Sarah from Finance says audit history is critical for compliance; the engineering lead says it can wait since it's not used until the first quarterly review. Can you prioritize these?"

## Expected Output Example

```markdown
# Prioritization: Expense Approval Tool — Year-End Release

## 1. Dependency Map
| Item | Depends On | Notes |
|------|-----------|-------|
| FR-02 | FR-01 | Notifications reference the pending list FR-01 creates |
| FR-03 | FR-01 | Rejection acts on a request that must first appear in the pending list |
| FR-04 | FR-03 | Audit history needs an approval/rejection action to record |

## 2. Stakeholder Conflicts
### Conflict 1: Priority of audit history (FR-04)
- Stakeholders involved: Sarah (Finance) vs. Engineering Lead
- Positions: Sarah considers FR-04 critical for compliance; Engineering Lead considers it deferrable since it isn't used until the first quarterly review, which falls after year-end.
- Resolution: Classified as Should have, not Must have, for the year-end release.
- Rationale: The compliance need (audit trail) is real but its first actual use (quarterly review) falls outside the year-end deadline window, so the dependency-driven urgency the CFO constraint creates does not apply to this item the way it does to FR-01–FR-03.

## 3. MoSCoW Classification
| ID | Item | Classification | Rationale |
|----|------|----------------|-----------|
| FR-01 | List pending requests | Must | Core workflow; FR-02 and FR-03 depend on it; without it the tool doesn't function |
| FR-02 | Notify on submission | Must | Directly enables the approval workflow the CFO deadline targets |
| FR-03 | Reject with reason | Must | Required for the workflow to replace the manual process described in the business problem |
| FR-04 | Audit history | Should | Compliance value confirmed, but first real use (quarterly review) falls after year-end; see Conflict 1 |

## 4. Trade-offs
- Deferring FR-04 to Should: gains earlier delivery of the core workflow by year-end; gives up having audit history available from day one — *accepted because the compliance need's actual deadline (quarterly review) is later than the release deadline*.

## 5. Decision Rationale Summary
Items directly required for the core approval workflow (FR-01–FR-03) were
classified Must, since the year-end deadline constraint applies specifically
to that workflow. FR-04 was deferred to Should because its compliance
driver has its own later deadline, resolving the stakeholder conflict
without dismissing Sarah's concern.

## 6. Document Status
Based on specification FR-01–FR-04 and the CFO year-end deadline constraint.
NFR and BR items from the specification were not included in this round —
pending separate prioritization input.
```