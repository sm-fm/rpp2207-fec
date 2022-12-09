import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';



const RelatedProducts = (props) => {
  const [position, setPosition] = useState(0);
  const componentName = 'RelatedProducts';
  const [modalShowing, setModalShowing] = useState(false);
  const [modalProduct, setModalProduct] = useState({});
  const [allFeatures, setAllFeatures] = useState(props.currentProduct.features);
  // const allFeatures = [...props.currentProduct.features, ...props.product.features]
  // .filter((v, i, a)=>a.findIndex(v2=>(v.feature === v2.feature && v.value === v2.value)) === i);

  // useEffect(() => {
  //   setAllFeatures([...props.currentProduct.features]);
  // }, [props.currentProduct]);

  return (
    <>
      <div className='related-products-container' style={{marginLeft: `-${position}px`}}>
        {props.relatedProducts ?
          props.relatedProducts.map((product) => {
            return <ProductCard
              setModalShowing={setModalShowing}
              setModalProduct={setModalProduct}
              allFeatures={allFeatures}
              setAllFeatures={setAllFeatures}
              key={product.id}
              product={product}
              generateStars={props.generateStars}
              isFetching={props.isFetching}
              setIsFetching={props.setIsFetching}
              parentComponent={componentName}
              yourOutfit={props.yourOutfit}
              addToOutfit={props.addToOutfit}
            />;
          })
          : null
        }

      </div>
      <div className='fade-top'>
        { position > 0 ?
          <div className="arrow-container-left" onClick={() => { setPosition(position - 250); }}>
            <div className="arrow-left"></div>
          </div>
          : null
        }
        { props && props.relatedProducts && position <= (props.relatedProducts.length - 4) * 250 ?
          <div className="arrow-container-right" onClick={() => { setPosition(position + 250); }}>
            <div className="arrow-right"></div>
          </div>
          : null
        }
      </div>
      {modalShowing ?
        <div className='comparison-modal'>
          <div className='modal-top'>COMPARING</div>
          <div className='modal-product-names'>
            <div className='product-1'>{props.currentProduct.name}</div>
            <div className='product-2'>{modalProduct.name}</div>
          </div>
          <table className='modal-table'>
            <tbody>
              {allFeatures.map((feature, index) => {
                return (
                  <tr key={`${feature}-${index}`}>
                    <td className='left-check'>{props.currentProduct.features.includes(feature) ? '✓' : null}</td>
                    <td>{feature.value} {feature.feature}</td>
                    <td className='right-check'>{modalProduct.features.includes(feature) ? '✓' : null}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        : null}
    </>
  );
};

export default RelatedProducts;