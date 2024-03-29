interface MenuItem {
    chip?: any
    id: string
    title: string
    type: string
    caption?: string
    icon: any
    url: string
    breadcrumbs: boolean
    disabled?: boolean
    children?: MenuItem[]
}
