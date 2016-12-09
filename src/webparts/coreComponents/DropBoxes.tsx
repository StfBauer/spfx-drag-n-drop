require('DropBox.css');

import * as React from 'react';
import * as ReactDom from 'react-dom';

// Defines Drag and Drop container
export class DragNDropContainer extends React.Component<any, any> {

    data: Array<any>;
    items: Array<DragNDropItem>;
    simpleList: any;

    constructor(props) {

        super(props);

        this.state = props;

    }

    // Hanlde Drag over events
    handleDragOver(event) {

        event.preventDefault();
        event.dataTransfer.dropEffect = "move";

    }

    // Handle Drop event
    handleDrop(event) {

        event.preventDefault();

        let data = null;

        data = JSON.parse(event.dataTransfer.getData("application/json"));

        var newState = this.state;
        newState.items.push(data);
        this.setState(newState);

    }

    render() {

        let index = 0;

        return (
            <div className="dropbox"
                onDrop={this.handleDrop.bind(this)}
                onDragOver={this.handleDragOver.bind(this)} >
                <div className="dropbox-title"><h2>{this.props.title}</h2></div>
                <div className="dropbox-zone">
                    {
                        this.state.items.map(function (item) {
                            return <DragNDropItem parentList={this} key={item.title} >
                                {item}
                            </DragNDropItem>
                        }, this)
                    }
                </div>
            </div>
        )
    }


}

// Defines Simple List Element of Drag and Drop Container
export class DragNDropItem extends React.Component<any, any> {

    itemData: any;
    parentComp: any;

    constructor(props) {

        super(props)

        // Save item data with item
        let itemData = props.children;
        let parentComp = props.parentComp;

        // Add unique id to item

        // store modified item data
        this.itemData = itemData;
        this.parentComp = props.parentList;

    }

    // Handle the start of the dragging action
    handleDragStart(event) {

        let itemData = this.itemData;

        event.dataTransfer.setData("application/json", JSON.stringify(itemData));
        event.dataTransfer.allowEffect = "move";
        event.dataTransfer.dropEffect = "move";


        // remove element
        let newItemsState = this.parentComp.state.items.filter(function (obj) {
            return obj.title != itemData.title;
        });

        var newState = {
            items: newItemsState
        };

        newState.items = newItemsState;

    }

    // Check if drop was successful or not
    handleWasDraged(event) {

        if (event.dataTransfer.dropEffect !== "none") {

            var currentItem = this.itemData;
            var newState = {
                title: this.parentComp.state.title,
                items: this.parentComp.state.items
            }
            // newState.items = newState.items.filter(function(obj){
            //     return obj.title === currentItem.title;
            // });
            var items = newState.items.filter(function (obj) {
                return obj.title !== currentItem.title
            })

            newState.items = items;

            this.parentComp.setState(newState);


        } else {
            console.log("Dragging was not successfull");
        }

    }

    render() {
        this.state = JSON.stringify(this.itemData);
        return (
            <div className="dropbox-item" ref="item" draggable data-title={this.itemData.title}
                onDragStart={this.handleDragStart.bind(this)}
                dragStart={this.handleDragStart.bind(this)}
                onDragEnd={this.handleWasDraged.bind(this)}>
                {this.itemData.title}
            </div>
        )
    }

}
