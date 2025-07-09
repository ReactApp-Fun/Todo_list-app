import React from "react";

class InteractTask extends React.Component{
    render() {
        return (
            <>
                {this.props.lists.map(list => (
                    <div className="text-list" key={list.id}>
                        <div style={{margin: "0", wordWrap: "break-word", width: "70%"}}>
                            <div>{list.text}</div>
                            {list.date && (
                                <div>
                                    {new Date(list.date).toLocaleDateString()}
                                </div>
                            )}  
                            <hr />
                        </div>
                        
                        <div style={{display: "flex", gap: "10px"}}>
                            <button 
                                type="button" 
                                className="add-button-2" 
                                onClick={() => this.props.updatingList(list)}
                            >
                                    Update
                            </button>

                            <button 
                                type="button" 
                                className="add-button-2" 
                                onClick={() => this.props.deleteList(list.id)}
                            >
                                    Delete
                            </button>

                        </div>
                    </div>
                ))}
            </>
        );
    }       
}

export default InteractTask;