import { useState } from "react";
import "./App.css";
import Editor from "./Editor";
import { Box, Button, Container, Typography } from "@mui/material";
import { OutputData } from "@editorjs/editorjs";

function App() {
  const [editorData, setEditorData] = useState<OutputData | undefined>();

  return (
    <div className="App">
      <Container maxWidth="xl" sx={{}}>
        <Box
          p={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "70vw",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#7800a4",
              width: "fit-content",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
            }}
          >
            <Typography
              variant="h6"
              component="span"
              sx={{ color: "#fff" }}
              fontWeight="bold"
            >
              Document/Form Editor 🚀
            </Typography>
          </Box>
          <Box
            mt={2}
            style={{
              backgroundColor: "#333",
              border: "1px solid #666",
              width: "100%",
              boxSizing: "border-box",
              textAlign: "left",
            }}
          >
            <Editor editorData={editorData} setEditorData={setEditorData} />
          </Box>
          <Button
            variant="contained"
            sx={{
              alignSelf: "end",
              mt: 2,
              textTransform: "none",
              // backgroundColor: "#ba11f7",
            }}
            color="success"
            onClick={() => console.log(editorData)}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
