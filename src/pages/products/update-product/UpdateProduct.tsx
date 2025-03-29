import { Product, SPU } from '@src/models/product.model';
import { productService } from '@src/services/product.service';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ProductItemForm from '../ProductItemForm';
import { Loading } from '@src/components/ui/Loading';
import { ROUTES } from '@src/constants/routes';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [spus, setSPUs] = useState<SPU[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const [product, spus] = await Promise.all([
          productService.getProductById(Number(id)),
          productService.getSPUs(Number(id)),
        ]);

        setSPUs(spus);
        setProduct(product);
      } catch (_error) {
        navigate(ROUTES.DASHBOARD.PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (isLoading || !product) {
    return <Loading />;
  }

  return <ProductItemForm product={{ ...product! }} spus={spus} isUpdate={true} />;
};

export default UpdateProduct;
