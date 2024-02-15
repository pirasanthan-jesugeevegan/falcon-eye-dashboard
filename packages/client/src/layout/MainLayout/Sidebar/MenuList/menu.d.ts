interface MenuItem {
    id: string
    title: string
    type: string
    caption?: string
    icon: any
    url: string
    breadcrumbs: boolean
    children?: MenuItem[]
}
