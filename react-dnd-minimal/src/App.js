import { useDrop, useDrag } from 'react-dnd';
import clsx from "clsx";

import styles from './App.module.css';

export const ItemTypes = {
  BOX: 'box',
};


export const Target = ({ name }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (source) => {
      console.log(`Target.drop ${source.name}`);
      return { name };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  
  return (
    <div 
      ref={drop} 
      className={clsx(styles.target, {
        [styles.active]: isActive,
        [styles.candrop]: canDrop
      })} 
    >
      <h2>{name}</h2>
      <p>{isActive ? 'Release to drop' : 'Drag a box here'}</p>
    </div>
  )
}


export const Box = function Box({ name }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        console.log(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div 
      ref={drag} 
      className={clsx(styles.box, {
        [styles.dragging]: isDragging
      })} 
    >
      {name}
    </div>
  )
}



function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Target name="First" />
        <Target name="Second" />
      </div>
      <div className={styles.container}>
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>
    </div>
  );
}

export default App;
