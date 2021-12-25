import { gql } from '@apollo/client';
import { hash } from 'bcryptjs';
import client from '../apollo-client';

export const getVideos = async() => {
    const GET_VIDEO_QUERY = gql`
      query {
        videos {
          id,
          createdAt,
          title,
          description,
          seen,
          slug,
          tags,
          thumbnail {
            url
          },
          mp4{
            url
          }
        }
      }
  `;

  const { data } = await client.query({
    query: GET_VIDEO_QUERY
  });

  return data.videos;
}

export const getVideoBySlug = async(pageSlug) => {
    const GET_VIDEO_BY_SLUG_QUERY = gql`
        query($pageSlug: String!) {
            video(where: {
                slug:$pageSlug
            }) {
                id,
                createdAt,
                title,
                description,
                seen,
                slug,
                tags,
                thumbnail {
                url
                },
                mp4{
                url
                }
            }
        }
    `;

    const variables = {
        pageSlug
    }

    const { data } = await client.query({
        query: GET_VIDEO_BY_SLUG_QUERY,
        variables: variables
    });

    return data.video;
}

export const createAccount =  async(account) => {
  const CREATE_ACCOUNT_MUTATION = gql`
    mutation PostAccountMutation (
      $email: String!,
      $password: String!,
      $name: String!
    ) {
      createAccount(data: {
          email: $email,
          password: $password,
          name: $name
        })
        {
          id
        }
      }
  `;

  const variables = {
    email: account.email.value,
    password: await hash(account.password.value, 12),
    name: account.name.value
  }

  const { data, loading, error } = await client.mutate({
    mutation: CREATE_ACCOUNT_MUTATION,
    variables: variables
  });

  if(!error)
    await publishAccount(data.createAccount.id);

  return {data, loading, error};
}

const publishAccount = async(id) => {
  const PUBLISH_ACCOUNT_MUTATION = gql`
    mutation publishAccountStage (
      $id: ID!
    ) {
      publishAccount(where: {
          id: $id
        },
        to: PUBLISHED)
        {
          id
        }
      }
  `;

  const variables = {
    id
  }
  const { data } = await client.mutate({
    mutation: PUBLISH_ACCOUNT_MUTATION,
    variables: variables
  });
}

export const authAccout = async(email) => {
  const AUTH_ACCOUNT_QUERY = gql`
    query($email: String!) {
        account(where: {
            email:$email
        }) {
            id,
            password,
            name
        }
    }
  `;

  const variables = {
    email
  }

  const { data } = await client.query({
    query: AUTH_ACCOUNT_QUERY,
    variables: variables
  });


  return data.account;
}