import { StyleSheet } from "react-native";
import { GRIS_TEXT } from "../../../commons/colors";
export default {
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    paddingTop: 0,
  },

  GridViewBlockStyle: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    height: 110,
    margin: 5,
    backgroundColor: GRIS_TEXT,
    borderRadius: 7,
  },

  GridViewBlockStyleInside: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    height: 110,
    borderRadius: 7,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(157,157,157,0.6)",
  },

  GridViewInsideTextItemStyle: {
    color: "#fff",
    padding: 10,
    fontSize: 13,
    justifyContent: "center",
  },

  iconadd: {
    fontSize: 28,
    color: "white",
    justifyContent: "center",
  },

  icondelete: {
    fontSize: 20,
    color: "white",
    justifyContent: "center",
  },

  iconmiddle: {
    fontSize: 20,
    color: "white",
    justifyContent: "center",
  },
};
