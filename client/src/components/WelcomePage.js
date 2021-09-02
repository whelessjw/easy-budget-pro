import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function WelcomePage() {
  return (
    <>
      <h1 className={css(styles.heading)}>Welcome!</h1>
      <h2 className="text-center">
        Please sign in with Google to get started.
      </h2>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: "150px",
    marginBottom: "50px",
    textAlign: "center",
  },
});
