import CustomTabs from './components/CustomTabs'
import { Box } from '@mui/joy'

const App = ()=> {
  return (
    <Box sx={{
      padding: "1rem",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto"
    }}>
      <CustomTabs/>
    </Box>
  )
}

export default App
