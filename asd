import * as React from 'react';
import * as ReactDom from 'react-dom';

export class SimpleList extends React.Component<any, any> {

    data: Array<any>;
    items: Array<SimpleListItem>;

    constructor(props) {

        super(props);
        this.data = props;

    }

    handleDrop(event) {
        event.preventDefault();

        var data = event.dataTransfer.getData("text");

        console.log('Hello World');
        console.log(data);

        event.target.appendChild(document.getElementById(data));

    }

    handleDrag(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    render() {

        var index = 0;

        let listElements = this.data.map(function (key) {
            index += 1;
            key.id = index;
            return <SimpleListItem>{key}</SimpleListItem>
        });

        console.log(listElements);

        return (
            <div className="simplelist" ondrag={this.handleDrag} ondrop={this.handleDrop}>
                {listElements}
            </div>
        )
    }

}

export class SimpleListItem extends React.Component<any, any> {

    title: string;
    id: string;

    constructor(props) {

        super(props)

        this.title = props.children.title;
        this.id = "item-" + props.children.id;
        console.log(props.children);

    }

    render() {
        return (
            <div className="simplelist-item" id={this.id} draggable>{this.title}</div>
        )
    }

}
