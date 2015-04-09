import React, {Component, Children, addons} from 'react/addons';

const data = [
  {
    name: "Alex",
    company: "plangrid"
  },
  {
    name: "Steve",
    company: "Apple"
  },
  {
    name: "Walt",
    company: "Disney"
  },
  {
    name: "Jesus",
    company: "Christians"
  }
];

const style = () => {
  return {
    cell: {
      width: 80,
      paddingLeft: 20,
      padding:15,
      borderLeft: "1px solid grey"
    },
    row: {
      borderBottom: "1px solid grey",
      marginBottom: 5,
      backgroundColor: "grey"
    }
  };
};

class NameCell extends Component {
  render() {
    return (
      <td
        style={style().cell}
        onClick={(e) => {
          if (this.props.onClick) this.props.onClick(this.props.data, e);
        }}>
        {this.props.data.name}
      </td>
    );
  }
}

class ActionsCell extends Component {
  render() {
    var cellStyle = style().cell;
    cellStyle.width = 150;

    return (
      <td
        style={cellStyle}>
        <button
          onClick={(e) => {
            if (this.props.onClick) this.props.onClick(this.props.data, e);
          }}>
          Action
        </button>
        <button
          onClick={(e) => {
            alert("bad!");
          }}>
          Don't Click!
        </button>
      </td>
    );
  }
}

class CompanyCell extends Component {
  render() {
    return (
      <td
        style={style().cell}>
        {this.props.data.company}
      </td>
    );
  }
}

class MapArrayToTableBody extends Component {
  render() {
    return (
      <tbody>
        {this.props.rows.map(this.renderColumn.bind(this))}
      </tbody>
    );
  }

  renderColumn(colData) {
    return (
      <tr style={this.props.rowStyle}>
        {Children.map(this.props.children, (child, i) => {
          return addons.cloneWithProps(child, {
              data: colData
          });
        })}
      </tr>
    );
  }
}

class HeaderCell extends Component {
  render() {
    return (
      <th
        style={style().cell}>
        <h3>{this.props.children}</h3>
      </th>
    );
  }
}

export class App extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr
            style={style().row}>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Company</HeaderCell>
            <HeaderCell>Actions</HeaderCell>
          </tr>
        </thead>
        <MapArrayToTableBody
          rows={data}
          rowStyle={style().row}
          >
          <NameCell
            onClick={(clicked, e) => {
              console.log(clicked);
            }}/>
          <CompanyCell />
          <ActionsCell
            onClick={(clicked, e) => {
              console.log(clicked);
            }}/>
        </MapArrayToTableBody>
      </table>
    );
  }
}
