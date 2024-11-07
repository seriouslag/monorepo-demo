# Frontend Monorepo Demo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/nest?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created.

Intent of this demo was to build a minimal frontend monorepo to demonstrate how to use Nx and other frontend tooling.

Technologies used in this demo:
- [nx](https://nx.dev/)
  - nx is a set of extensible dev tools for monorepos. It provides a complete toolchain for building, testing, and deploying applications in a monorepo. Nx provides a useful CLI and tools for managing monorepos, including features like dependency graph generation, code formatting, local build and CI caching, and dependency management.
  - Nx is helpful to manage the monorepo and its dependencies. Nx will 
- [Zodios API](https://www.zodios.org/)
  - Zodios is a HTTP client library for Javascript that provides compile and runtime type safety for APIs requests and responses. Zodios bridges the gap between the browser and the server, allowing you to write type-safe code that can be executed both on the server and in the browser. This technology is useful if you don't have control over the API you're consuming, or if you want to use the same code for both the server and client. Brings the developer experience (DX) closer to the experience of using technologies like [tRPC](https://trpc.io/). 
  - We use [openapi-zod-client](https://github.com/astahmer/openapi-zod-client) to generate typescript types, [Zod](https://zod.dev/) schemas, and Zodios client from an openapi spec.
  - We add a plugin to add react query hooks from the Zodios client using [@zodios/react](https://www.zodios.org/docs/client/react). This allows us to have type safe data fetching and caching to our React components.
- [Tanstack Query](https://tanstack.com/query/latest) (or React Query)
  - react query is a lightweight and flexible data fetching and caching library for React
  - react query replaces redux and redux toolkit for state management related to data fetching
- [Playwright](https://playwright.dev/)
  - Playwright is a modern end-to-end (e2e) testing and web app testing framework for Node.js, .NET, Python, and Java.

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve cat-facts
```

To create a production bundle:

```sh
npx nx build cat-facts
```

To see all available targets to run for a project, run:

```sh
npx nx show project cat-facts
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/nest:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)


[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/nest?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
