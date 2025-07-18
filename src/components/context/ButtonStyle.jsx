import React from "react";
import styled, { ThemeContext } from "styled-components";

class ButtonStyle extends React.Component {
    static contextType = ThemeContext; // sử dụng context để lấy theme
    render() {
        const { theme } = this.context; // lấy giá trị theme từ context
        return (
            <div  style={{ backgroundColor: theme === 'light' ? '#f0f0f0' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
                {this.props.children}
            </div>
        );
    }
}

export const CoolButton = styled.button`
    width: auto;
    padding: 10px;
    border: unset;
    border-radius: 4px;
    color: #fff;
    z-index: 1;
    background: #fb7a2f;
    position: relative;
    font-weight: 500;
    font-size: 20px;
    transition: all 250ms;
    overflow: hidden;
    cursor: pointer;
    outline: none;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        border-radius: 4px;
        background-color: #fff;
        z-index: -1;
        transition: all 250ms
    }

    &:hover{
        color: #fb7a2f;
        border: 1px solid #fb7a2f;
    }

    &:hover::before {
        width: 100%;
    }
`

export default ButtonStyle;