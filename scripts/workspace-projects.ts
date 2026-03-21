export type WorkspaceProject = {
    alias: string;
    packageName: string;
    description: string;
};

export const workspaceProjects: WorkspaceProject[] = [
    {
        alias: "rna-tw",
        packageName: "@apps/react-next-app-tailwind",
        description: "react next app tailwind"
    },
    {
        alias: "rna-ve",
        packageName: "@apps/react-next-app-vanilla-extract",
        description: "react next app vanilla-extract"
    },
    {
        alias: "rnp-tw",
        packageName: "@apps/react-next-pages-tailwind",
        description: "react next pages tailwind"
    },
    {
        alias: "rnp-ve",
        packageName: "@apps/react-next-pages-vanilla-extract",
        description: "react next pages vanilla-extract"
    },
    {
        alias: "rr-ve",
        packageName: "@apps/react-react-router-vanilla-extract",
        description: "react react-router vanilla-extract"
    },
    {
        alias: "rtr-tw",
        packageName: "@apps/react-tanstack-router-tailwind",
        description: "react tanstack-router tailwind"
    },
    {
        alias: "rtr-ve",
        packageName: "@apps/react-tanstack-router-vanilla-extract",
        description: "react tanstack-router vanilla-extract"
    },
    {
        alias: "vn-sc",
        packageName: "@apps/vue-nuxt-scoped-css",
        description: "vue nuxt scoped-css"
    },
    {
        alias: "vn-ve",
        packageName: "@apps/vue-nuxt-vanilla-extract",
        description: "vue nuxt vanilla-extract"
    },
    {
        alias: "vr-sc",
        packageName: "@apps/vue-vue-router-scoped-css",
        description: "vue vue-router scoped-css"
    },
    {
        alias: "vr-ve",
        packageName: "@apps/vue-vue-router-vanilla-extract",
        description: "vue vue-router vanilla-extract"
    }
];
