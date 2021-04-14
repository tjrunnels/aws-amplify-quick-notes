import React from "react";

import PostEditor from "./Post-Editor"

import Dialog from "./Dialog";


//export props in {this}
export default props => (
    //Fit everything in a pop-up-esque container, that can take a onDismiss prop
    <Dialog onDismiss={props.onDismiss}>
        <PostEditor
          title={props.title}
          text={props.text}
          onDismiss={props.onDismiss}
          onSave={async values => { props.onSaveChanges(values) }  }
        />
    </Dialog>
);
