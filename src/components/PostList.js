import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import styled from "@emotion/styled";

import Post from "./Post";
import { listNotes } from "../graphql/queries";
import { updateNote, deleteNote } from "../graphql/mutations";

const Container = styled("div")`
  max-width: 800px;
  margin: 16px auto;
  width: 100%;
`;

export default () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const result = await API.graphql(graphqlOperation(listNotes));

      setPosts(
        result.data.listNotes.items.sort((a, b) => {
          if (a.updatedAt > b.updatedAt) return -1;
          else return 1;
        })
      );
    };

    fetchNotes();
  }, []);

  return (
    <Container>
      {posts.map(note => (
        <Post
          key={note.id}
          {...note}
          onSaveChanges={async values => {
            console.log("saving Post edit")
            const result = await API.graphql(
              graphqlOperation(updateNote, {
                input: {
                  ...note,
                  ...values
                }
              })
            );

            setPosts(
              posts.map(n => {
                return n.id === note.id ? result.data.updateNote : n;
              })
            );
          }}
          onDelete={async () => {
            const result = await API.graphql(
              graphqlOperation(deleteNote, {
                input: {
                  id: note.id
                }
              })
            );

            setPosts(posts.filter(n => n.id !== note.id));
          }}
        />
      ))}
    </Container>
  );
};
