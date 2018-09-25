// TODO REMOVE THE WHOLE FILE, UNUSED

import React from 'react';
import { Button } from './common/button';

const Header = ({ header }) => {
  switch (header && header.type) {
    case "ARTICLE":
      return <div><b>Header:</b> {header.subject}</div>
    case "TOPIC":
      return <div><b>Header:</b> {header.id}</div>
    case "COLLECTION":
      return <div><b>Header:</b> {header.name}</div>
    default:
      return null;
  }
};

const CuratedList = ({ addItem, addHeaderModal, editCuratedList, removeHeader, removeResource, removeList, curatedList: { id, name, description, header, resources, owner_id, featured } }) =>
  <tr>
    <td><input onChange={() => editCuratedList({
      id,
      name,
      featured: !featured,
      description,
      header,
      resources,
    })} type="checkbox" checked={featured} /></td>
    <td>
      <h4>{name}</h4>
      <p>{description}</p>
      <p>{owner_id}</p>
    </td>
    <td>
      <ul>
        <Header header={header} />
        {resources.map(i => {
          switch (i.type) {
            case "ARTICLE":
              return <li style={{ display: 'flex', flex: 1, justifyContent: 'space-between', marginBottom: 10 }} key={i.id}><span>ARTICLE: {i.subject}</span><div style={{ cursor: 'pointer' }} onClick={() => removeResource({ id, resource: { type: 'ARTICLE', id: i.id } })}>🗑️</div></li>
            case "TOPIC":
              return <li style={{ display: 'flex', flex: 1, justifyContent: 'space-between', marginBottom: 10 }} key={i.id}><span>TOPIC: {i.id}</span><div style={{ cursor: 'pointer' }} onClick={() => removeResource({ id, resource: { type: 'TOPIC', id: i.id } })}>🗑️</div></li>
            case "COLLECTION":
              return <li style={{ display: 'flex', flex: 1, justifyContent: 'space-between', marginBottom: 10 }} key={i.id}><span>COLLECTION: {i.name}</span><div style={{ cursor: 'pointer' }} onClick={() => removeResource({ id, resource: { type: 'COLLECTION', id: i.id } })}>🗑️</div></li>
            case "REQUEST":
              return <li style={{ display: 'flex', flex: 1, justifyContent: 'space-between', marginBottom: 10 }} key={i.id}><span>REQUEST: {i.subject}</span><div style={{ cursor: 'pointer' }} onClick={() => removeResource({ id, resource: { type: 'REQUEST', id: i.id } })}>🗑️</div></li>
            default:
              return null;
          }
        })
        }
      </ul>
    </td>
    <td>
      <Button onClick={addItem}>Add Item to List</Button>
      {!header && <Button onClick={addHeaderModal}>Add Header</Button>}
      {header && <Button onClick={() => removeHeader(id)}>Remove Header</Button>}
    </td>
    <td><Button onClick={() => removeList({ id })}>Delete List</Button></td>
  </tr>;

export default CuratedList;