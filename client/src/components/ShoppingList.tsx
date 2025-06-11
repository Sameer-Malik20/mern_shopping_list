import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem} from '../flux/actions/itemActions';
import { IItemReduxProps, IShoppingList } from '../types/interfaces';

const ShoppingList = ({
  getItems,
  item,
  isAuthenticated,
  deleteItem,
  editItem, // <-- add this
}: IShoppingList & { editItem: Function }) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const handleEdit = (id: string) => {
    // Example: prompt user for new name
    const newName = window.prompt('Edit item name:');
    if (newName && newName.trim()) {
      editItem(id, { name: newName });
    }
  };

  const { items } = item;
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated && (
                  <>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(_id)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      &times;
                    </Button>
            
                  </>
                )}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

const mapStateToProps = (state: IItemReduxProps) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem})(
  ShoppingList
);
