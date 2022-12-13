import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';

const RelatedProducts = (props) => {
  const [position, setPosition] = useState(0);
  const componentName = 'RelatedProducts';
  const [modalShowing, setModalShowing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [comparisonProduct, setComparisonProduct] = useState({});

  useEffect(() => {
    setCurrentProduct(props.currentProduct);
  }, [props.currentProduct]);

  const getFeatures = () => {
    console.log('currentProduct.features: ', currentProduct.features);
    console.log('comparisonProduct.features: ', comparisonProduct.features);
    return [...currentProduct.features, ...comparisonProduct.features]
      .filter((v, i, a)=>a.findIndex(v2=>(v.feature === v2.feature && v.value === v2.value)) === i);
  };

  return (
    <>
      <div className='related-products-container' style={{marginLeft: `-${position}px`}}>
        {props.relatedProducts ?
          props.relatedProducts.map((product) => {
            return <ProductCard
              modalShowing={modalShowing}
              setModalShowing={setModalShowing}
              setComparisonProduct={setComparisonProduct}
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
            <div className='product-1'>{currentProduct.name}</div>
            <div className='product-2'>{comparisonProduct.name}</div>
          </div>
          <table className='modal-table'>
            <tbody>
              {getFeatures().map((feature, index) => {
                return (
                  <tr key={`${feature}-${index}`}>
                    {console.log(currentProduct.features, comparisonProduct.features)}
                    <td className='left-check'>{currentProduct.features.filter(item => item.feature === feature.feature && item.value === feature.value).length > 0 ? '✓' : null}</td>
                    <td>{feature.value} {feature.feature}</td>
                    <td className='right-check'>{comparisonProduct.features.filter(item => item.feature === feature.feature && item.value === feature.value).length > 0 ? '✓' : null}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="close-btn" onClick={() => { setModalShowing(false); }}></div>
        </div>
        : null}
    </>
  );
};

export default RelatedProducts;