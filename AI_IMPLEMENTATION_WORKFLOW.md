# AI Implementation Workflow

## Goal

Provide a repeatable workflow for AI assistants and developers to implement the Competitor Intelligence Agent safely.

## Workflow

1. Review `AI_PROJECT_OVERVIEW.md` for product intent.
2. Review `AI_PROJECT_TRACKING.md` for the current milestone and open work.
3. Review `AI_PROJECT_PACKAGES.md` before adding or changing dependencies.
4. Review `AI_DEVELOPMENT_GUIDE.md` for implementation rules.
5. Review `docs/project.md` for requirements that are not represented elsewhere.
6. Identify the smallest change that satisfies one tracked task.
7. Add or update a failing test when behavior is changed.
8. Implement the minimal root-cause fix.
9. Run targeted tests, type checking, linting, and build validation.
10. Update tracking status and summarize the change.

## Task completion criteria

A task is complete only when:

- The behavior works in the relevant runtime.
- Automated checks pass.
- The diff is limited to the requested change.
- Documentation and tracked status are consistent.
- No secret or private data is introduced.

## Suggested task format

```text
Task: <short objective>
Files: <affected files>
Requirements: <specific behavior>
Acceptance criteria:
- <testable result>
- <testable result>
- <testable result>
```

## Documentation maintenance

Keep these files synchronized:

- `docs/project.md`
- `AI_PROJECT_OVERVIEW.md`
- `AI_PROJECT_TRACKING.md`
- `AI_PROJECT_PACKAGES.md`
- `AI_DEVELOPMENT_GUIDE.md`
- `AI_IMPLEMENTATION_WORKFLOW.md`
