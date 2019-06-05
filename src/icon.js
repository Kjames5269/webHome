import styled from 'styled-components'
import React from 'react'

const IconPic = styled.img`
    border-radius: 10px;
    float: right;
    height: 80px;
    width: 80px
    margin: 10px;
    margin-left: 0px;
`

class Icon extends React.Component {
    render() {
        return (
            <a href={this.props.href}>
                <IconPic src={this.props.pic} alt={this.props.alt}/>
            </a>
        )
    }
}

export default Icon