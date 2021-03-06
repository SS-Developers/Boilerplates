import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../context/modalSlice";
import { RootState } from "../../context/store";
import "./SimpleModal.css";

const SimpleModal: React.FC<{}> = props => {
  const modalState = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  return (
    <>
      <motion.div
        className="simpleModal__children"
        animate={
          modalState.isOpen ? { filter: "blur(1.1rem)" } : { filter: "none" }
        }
        style={{
          position: "relative",
          width: "100",
        }}>
        {props.children}
      </motion.div>
      <div
        className="simpleModal__overlay"
        style={
          modalState.isOpen
            ? { display: "grid", height: "100vh" }
            : { display: "hidden", height: 0 }
        }
        // style={{ display: "none", x: 1000 }}
      >
        <div className="simpleModal__wrapper">
          <motion.div
            className="simpleModal"
            animate={
              modalState.isOpen
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : { opacity: 0, y: -200 }
            }
            transition={{ type: "ease", duration: ".15" }}>
            <h1 className="simpleModal__header">
              {modalState.type.code === "IMPORTANT" && (
                <span
                  style={{
                    backgroundColor: "#fd5252",
                    padding: "1rem",
                    borderRadius: "1.1rem",
                    fontSize: "2rem",
                    marginRight: "1rem",
                  }}>
                  IMPORTANT
                </span>
              )}
              {modalState.header}
            </h1>
            <button
              className={`simpleModal__close ${
                modalState.type.code === "IMPORTANT"
                  ? "simpleModal__buttonDisabled"
                  : ""
              }`}
              disabled={modalState.type.code === "IMPORTANT"}
              onClick={() => dispatch(modalActions.closeModal())}>
              <i className="bx bx-window-close"></i>
            </button>
            <div className="simpleModal__content">
              {modalState.text && <p>{modalState.text}</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SimpleModal;
