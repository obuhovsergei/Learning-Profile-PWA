/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '@/stores/user' {
    import type { DefineStoreOptions } from 'pinia'
    const store: DefineStoreOptions
    export default store
}

declare module '@stores/user' {
    import type { DefineStoreOptions } from 'pinia'
    const store: DefineStoreOptions
    export default component
}
