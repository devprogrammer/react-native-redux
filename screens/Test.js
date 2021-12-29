import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const JustifyContentBasics = () => {
  const [ justifyContent, setJustifyContent ] = useState("flex-start");

  return (
    <PreviewLayout
      label = "JustifyContent"
      values = {[
        "flex-start",
        "flex-end",
        "flex-center",
        "space-between",
        "space-around",
        "space-evenly"
      ]}
      selectedValue = {justifyContent}
      setSelectedValue = {setJustifyContent}
    >
      <View
        style={[styles.box, {backgroundColor: 'powerblue'}]}
      >
      </View>
      <View
        style={[styles.box, {backgroundColor: 'skyblue'}]}
        >
      </View>
      <View
        style={[styles.box, {backgroundColor: 'steelblue'}]}
        >
      </View>
    </PreviewLayout>
  );
};

const PreviewLayout = ({
  label,
  values,
  selectedValue,
  setSelectedValue
}) => (
  <View style={{ padding: 10, flex: 1 }}>
    <Text style={ styles.label }>{label}</Text>
    <View style={ styles.row }>
      {
        values.map((value) => (
          <TouchableOpacity
            key={ value }
            onPress = {() => setSelectedValue(value)}
            style={[ styles.button, selectedValue===value && styles.selected]}
          >
            <Text style={[ styles.buttonLabel, selectedValue===value && styles.selectedLabel]}>
              {value}
            </Text>
          </TouchableOpacity>
        ))
      }
    </View>
    <View style={[ styles.container, { [label]: selectedValue }]}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue'
  },
  box: {
    minWidth: 50,
    minHeight: 50
  },
  label: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: "48%",
    borderRadius: 4,
    textAlign: "center",
    backgroundColor: "oldlace",
    marginHorizontal: "1%",
    marginBottom: 10,
    alignSelf: "flex-start"
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: "coral"
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0
  },
  selectedLabel: {
    color: "white"
  }
});