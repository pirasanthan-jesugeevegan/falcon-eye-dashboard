interface MenuItem {
    id: string
    title: string
    type: 'collapse' | 'item' | 'group'
    url?: string
    icon?: React.ElementType
    children?: MenuItem[]
    breadcrumbs?: boolean
}
