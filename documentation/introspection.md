# Graphql Introspection

GraphQL allows us to ask schema for information about what queries it supports using the introspection system.
REACT_APP_JAVA_GRAPH_QL environment variables have an impact on how it works.

To get actual GraphQL schema with information what types, queries and mutations it supports, run

> yarn generate

Actual GraphQL schema located in ```src/apollo/schema.graphql```, here you can find everything about used GraphQL things.
