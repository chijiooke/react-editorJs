import { OutputData } from "@editorjs/editorjs";
import {
  Box,
  Button,
  ClickAwayListener,
  Container,
  Divider,
  Popper,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import "./App.css";
import Editor from "./Editor";
import { FormDataType } from "./types/FormDataType";

function App() {
  const [editorData, setEditorData] = useState<OutputData | undefined>();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [selectType, setSelectType] = useState("Text");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectType(event.target.value);
  };

  const handleClick = (event: KeyboardEvent) => {
    setAnchorEl(event.target as HTMLElement);
    setOpen(true);
    event.stopPropagation();
  };

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (event.currentTarget !== anchorEl) {
      setAnchorEl(null);
      setOpen(false);
    }
  };

  window.addEventListener("keypress", (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "/") {
      handleClick(e);
    }
  });


  const formdata = useRef<null | FormDataType>(null)
  const handleSubmit = (e: any) => {
    e.preventDefault();
    formdata.current = onChangeFormData;
    setOpen(false);
    setOnChangeFormData({ title: "", type: "" });
  };
  // const [formdata, setFormdata] = useState<null | FormDataType>(null);
  const [onChangeFormData, setOnChangeFormData] = useState<FormDataType>({
    title: "",
    type: "",
  });

  return (
    <div className="App">
      <ClickAwayListener
        onClickAway={(event: MouseEvent | TouchEvent) => handleClickAway(event)}
      >
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom"
          sx={{ zIndex: 4 }}
        >
          <Box
            sx={{
              width: "400px",
              backgroundColor: "#fff",
              borderRadius: ".5rem",
              padding: 1,
            }}
          >
            <Typography color="common.black" sx={{ mb: 1 }}>
              Define Field
            </Typography>
            <Divider />
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
              onSubmit={handleSubmit}
            >
              <TextField
                value={onChangeFormData.title}
                label="Title"
                type="text"
                size="small"
                fullWidth
                onChange={(e) =>
                  setOnChangeFormData({
                    ...onChangeFormData,
                    title: e?.target.value,
                  })
                }
              />
              <TextField
                value={onChangeFormData.type}
                label="Type"
                type="text"
                size="small"
                fullWidth
                onChange={(e) =>
                  setOnChangeFormData({
                    ...onChangeFormData,
                    type: e?.target.value,
                  })
                }
              />

              <Button
                type="submit"
                sx={{
                  textTransform: "none",
                  alignSelf: "end",
                  backgroundColor: "#7800a4",
                  color: "#fff",
                }}
                variant="contained"
              >
                Done
              </Button>
            </form>
          </Box>
          {/* <TextField label="title"/> */}
        </Popper>
      </ClickAwayListener>

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
            <Editor
              editorData={editorData}
              setEditorData={setEditorData}
              formData={formdata}
            />
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
            onClick={() =>
              console.log(editorData?.blocks.map((block, i) => block.data))
            }
          >
            Submit
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default App;
