import { Box, Tab } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import renderAllVacationRequests from "./components/allVacations";
import renderMyVacations from "./components/myVacations";

const App = () => {
  const [ tabIndex, setTabIndex ] = useState("1");

  const handleChange = (event: ChangeEvent<object>, newTabIndex: string) => {
    setTabIndex(newTabIndex);
  };
  
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={tabIndex}>
        <Box>
          <TabList onChange={ (event, value) => handleChange(event, value) }>
            <Tab label="My Vacations" value="1"/>
            <Tab label="Emloyee VacationRequests" value="2"/>
          </TabList>
        </Box>
        <TabPanel value="1">
          { renderMyVacations() }
        </TabPanel>
        <TabPanel value="2">
          { renderAllVacationRequests() }
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default App;
