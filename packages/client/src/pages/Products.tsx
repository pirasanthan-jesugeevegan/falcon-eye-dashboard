import React, { useEffect, useState } from 'react'
import FingerprintIcon from '@mui/icons-material/Fingerprint'
import { Box, Grid, Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import MainCard from 'components/Cards/MainCard'
import SmallCard from '../components/Cards/SmallCard'
import E2ETestDataTable from '../components/Tables/E2ETestDataTable'
import UnitTestDataTable from '../components/Tables/UnitTestDataTable'
import { gridSpacing } from '../redux/constants'
import { getProductE2EData, getProductUnitData } from '../redux/selectors'
import { retrieveE2EData, retrieveUnitData } from '../redux/thunks/product'
import { getApiByName } from '../utils/product-name-converter'

const Products = ({ title }: { title: string }) => {
    const dispatch = useDispatch()
    const theme = useTheme()

    const unitData = useSelector(getProductUnitData(getApiByName(title)))
    const e2eData = useSelector(getProductE2EData(getApiByName(title)))

    const [isLoading, setLoading] = useState<boolean>(true)
    const [value, setValue] = useState<number>(0)
    const [data, setData] = useState<TestData[]>([])
    const [isUnitDataFetched, setUnitDataFetched] = useState<string>('')
    const [isE2EDataFetched, setE2EDataFetched] = useState<string>('')

    const getTestPercentage = (pass: number, fail: number, skip: number) => {
        const totalTests = pass + fail + skip
        const passPercentage = (((pass + skip) / totalTests) * 100).toFixed(0)
        const overallResult = isNaN(Number(passPercentage))
            ? 'No Data'
            : `${passPercentage}%`
        return overallResult
    }

    const lastItem = data[data.length - 1]
    const percentageData = getTestPercentage(
        lastItem?.pass,
        lastItem?.fail,
        lastItem?.skip
    )

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                if (isUnitDataFetched !== getApiByName(title)) {
                    // @ts-ignore
                    await dispatch(retrieveUnitData(getApiByName(title)))
                    setUnitDataFetched(getApiByName(title))
                }
                if (isE2EDataFetched !== getApiByName(title)) {
                    // @ts-ignore
                    await dispatch(retrieveE2EData(getApiByName(title)))
                    setE2EDataFetched(getApiByName(title))
                }
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [
        dispatch,
        title,
        e2eData,
        isE2EDataFetched,
        isUnitDataFetched,
        unitData,
        value,
    ])

    useEffect(() => {
        const modifiedData = e2eData.data.map((item: TestData) => ({
            ...item,
            title,
        }))

        modifiedData.sort((a: TestData, b: TestData) => {
            // Convert date strings to Date objects for comparison
            const dateA = new Date(a.date)
            const dateB = new Date(b.date)

            // Compare the dates
            return dateB.getTime() - dateA.getTime()
        })

        setData(modifiedData)
    }, [e2eData, title, value])

    return (
        <MainCard
            title={`${value === 0 ? 'Unit' : 'E2E'} Test Result: ${title}`}
            sx={{ boxShadow: theme.shadows[6] }}
        >
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={6} xs={12} md={6} lg={4}>
                            <SmallCard
                                isLoading={isLoading}
                                title="Latest E2E Run"
                                result={percentageData}
                                icon={<FingerprintIcon fontSize="inherit" />}
                                backgroundColor="primary"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12} md={6} lg={4}>
                            <SmallCard
                                isLoading={isLoading}
                                title="Latest Unit Run"
                                result={
                                    unitData.data[0]?.result[0]?.percentage
                                        ? `${unitData.data[0]?.result[0]?.percentage}%`
                                        : 'No Data'
                                }
                                icon={<FingerprintIcon fontSize="inherit" />}
                                backgroundColor="secondary"
                            />
                        </Grid>
                        {/* <Grid item sm={6} xs={12} md={6} lg={4}>
              <SmallCard
                isLoading={isLoading}
                title="Latest E2E Test Coverage Report"
                result="No Data"
                icon={<FingerprintIcon fontSize="inherit" />}
              />
            </Grid> */}
                        <Grid item xs={12}>
                            <>
                                <Box
                                    sx={{
                                        width: '100%',
                                        bgcolor: 'background.paper',
                                    }}
                                >
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="disabled tabs example"
                                    >
                                        <Tab label="Unit Test" />
                                        <Tab label="E2E Test" />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    {isLoading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <UnitTestDataTable
                                            data={unitData.data}
                                            isLoading={isLoading}
                                        />
                                    )}
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    {isLoading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <E2ETestDataTable
                                            data={e2eData.data}
                                            isLoading={isLoading}
                                        />
                                    )}
                                </TabPanel>
                            </>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    )
}

export default Products

interface TabPanelProps {
    children: React.ReactNode
    index: number
    value: number
}
// TabPanel component
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box>{children}</Box>}
        </div>
    )
}
