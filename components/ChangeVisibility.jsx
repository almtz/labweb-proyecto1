import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import visibilityEnum from "../utils/visibilityEnum";

const ChangeVisibility = (props) => {
  const [visibility, setVisibility] = useState(props.item.visibility);

  const handleChange = async (e) => {
    setVisibility(e.target.value);

    await setDoc(
      doc(firestore, "TierLists", props.item.id),
      {
        visibility: e.target.value,
      },
      { merge: true }
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Visibilidad</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={visibility}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={visibilityEnum.publica}>Publica</MenuItem>
        <MenuItem value={visibilityEnum.privada}>Privada</MenuItem>
        <MenuItem value={visibilityEnum.borrador}>Borrador</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ChangeVisibility;
