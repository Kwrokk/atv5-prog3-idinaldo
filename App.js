import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert, ThemedView} from "react-native";
import { Avatar, Card, Divider, Header, Icon, SearchBar } from "react-native-elements";
import * as React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollView } from "react-native-web";

function App({ navigation }) {
  const [doctors, setDoctors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        alert("Erro ao buscar doutores: ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        alert("Erro ao buscar categorias: ", err);
      });
  });


  useEffect(() => {
    axios.get("http://localhost:3000/users/1")
    .then((res) => {
      setUser(res.data);
    })
    .catch((err) => {
      alert("Erro ao logar usuário");
    })
  });

  return (
    <View style={styles.container}>
      {/* <Text>Então, só foi um samba triste</Text> */}
      <Divider style={styles.cabecalho}>
        <Divider style={styles.avatarMessageContainer}>
          <Avatar
            size={60}
            rounded
            source={{ uri: user.avatar_url}}
            containerStyle={{
              backgroundColor: "#e499e4",
              marginTop: "15px",
              marginLeft: "10px",
            }}
          />

          <Divider style={styles.messageContainer}>
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: "1.2rem" }}
            >
              Welcome
            </Text>
            <Text style={{ color: "white" }}>
              {user.nome}
            </Text>
          </Divider>
        </Divider>

        <SearchBar
          style={styles.searchBar}
          placeholder="Search Doctor"
          inputContainerStyle={{ backgroundColor: "white", borderRadius: 20 }}
          containerStyle={{
            backgroundColor: "#e499e4",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            elevation: 0,
          }}
        />
      </Divider>
      <ScrollView>
        <View style={styles.splitTitles}>
          <View>
            <Text style={styles.h2Text}>Categories</Text>
          </View>

          <View>
            <Text style={styles.h2Text}>Show All</Text>
          </View>
        </View>

          {/* CATEGORIAS */}
        <View style={styles.menu}>
          {categories.map((categories) => (
            <Card containerStyle={styles.iconContainer}>
              <FontAwesome5 name={categories.iconName} size={40} style={{paddingLeft: 15}}/>
              <Card.Title style={styles.cardTitle}>{categories.nome}</Card.Title>
            </Card>
          ))}
        </View>

        <View>
          <Text style={[styles.leftText, styles.h2Text]}>Top Doctors</Text>
        </View>

          
          {/* DOUTORES */}
        <View style={styles.menu}>
          {doctors.map((doctor) => (
            <Card containerStyle={styles.doctorsCard}>
              <View style={styles.flexContainer}>
                <Avatar
                  size={60}
                  rounded
                  icon={{ name: "user", type: "font-awesome" }}
                  containerStyle={{
                    backgroundColor: "#e499e4",
                    marginTop: "15px",
                    marginLeft: "10px",
                  }}
                />
                <View style={styles.messageContainer}>
                  <Card.Title style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {doctor.nome}
                  </Card.Title>
                  <Text>{doctor.especialidade}</Text>
                  <Text style={{ color: "gray" }}>
                    <Icon
                      name="star"
                      type="font-awesome"
                      color="yellow"
                      size={18}
                    />{" "}
                    {doctor.review} ({doctor.amountReviewed} Reviews)
                  </Text>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: "#e499e4",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          height: 80,
        }}
      >
        <View>
          <Icon name="home" type="font-awesome" color="white" size={40} />
          <Text style={{ color: "white" }}>Home</Text>
        </View>

        <View>
          <Icon
            name="stethoscope"
            type="font-awesome"
            color="white"
            size={40}
          />
          <Text style={{ color: "white" }}>Doctors</Text>
        </View>

        <View>
          <Icon name="calendar" type="font-awesome" color="white" size={40} />
          <Text style={{ color: "white" }}>Appointments</Text>
        </View>

        <View>
          <Icon name="user" type="font-awesome" color="white" size={40} />
          <Text style={{ color: "white" }}>Profile</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
  iconContainer: {

    width: "25%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },  
  container: {
    margin: 0,
    padding: 0,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "column",
  },

  leftText: {
    margin: 10,
  },

  h2Text: {
    fontWeight: "bold",
    fontSize: 18,
  },

  doctorsCard: {
    width: "90%",
  },

  searchBar: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    elevation: 0,
    padding: 0,
  },

  splitTitles: {
    paddingTop: 10,
    width: "90%",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },

  input: {
    textAlign: "center",
    height: 40,
    margin: 12,
    borderColor: "#e499e4",
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },

  cardBox: {
    width: 100,
    height: 120,
  },

  cardTitle: {
    fontSize: 11,
  },

  texto: {
    fontSize: 20,
    color: "#e499e4",
  },

  textomedio: {
    fontSize: 40,
    color: "#e499e4",
  },

  textogrande: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 80,
    color: "#e499e4",
  },

  avatarMessageContainer: {
    flexDirection: "row",
    padding: 0,
  },

  messageContainer: {
    marginTop: 25,
    marginLeft: 15,
  },

  cabecalho: {
    height: 160,
    width: "100%",
    backgroundColor: "#e499e4",
  },

  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10,
  },
});

export default App;
