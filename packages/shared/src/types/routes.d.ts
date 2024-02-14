interface MenuItem {
    id: string
    title: string
    type: 'collapse' | 'item' // Type can only be 'collapse' or 'item'
    url: string
    icon: React.ElementType // Assuming icon is a React node
    children?: MenuItem[] // Children can be an array of MenuItem or undefined
    breadcrumbs?: boolean // Optional property indicating whether to show breadcrumbs
}
