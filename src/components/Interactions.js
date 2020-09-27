import React from 'react';

class Interactions extends React.Component {
    render() {
        let {
            intImg,
            intTitle
        } = this.props;

        return (
            <div className="intWrapper" style={{ backgroundImage: `url(${intImg})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
            </div>
        )
    }
}

export default Interactions;