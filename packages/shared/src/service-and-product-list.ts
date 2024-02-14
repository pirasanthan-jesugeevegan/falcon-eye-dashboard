export interface ServiceAndProducts {
    name: string
    slug: string
    icon: string
    api: string
}

export const servicesAndProducts = [
    {
        name: 'Identity Service',
        slug: 'identity-service',
        icon: 'FingerprintIcon',
        api: 'identity_service',
    },
    {
        name: 'Key Distribution Service',
        slug: 'key-distribution-service',
        icon: 'SupportIcon',
        api: 'key_distribution_service',
    },
    {
        name: 'Ledger Support Tool',
        slug: 'ledger-support-tool',
        icon: 'PaidIcon',
        api: 'ledger_support_tool',
    },
    {
        name: 'Transaction Protection',
        slug: 'transaction-protection',
        icon: 'SosIcon',
        api: 'transaction_protection',
    },
    {
        name: 'Recovery as a service',
        slug: 'recovery-as-a-service',
        icon: 'SupportAgentIcon',
        api: 'recovery_as_a_service',
    },
    {
        name: 'Secure Data Service',
        slug: 'secure-data-service',
        icon: 'ShieldIcon',
        api: 'secure_data_service',
    },
]
