import Button from '@src/components/ui/Button';
import Input from '@src/components/ui/Input';
import { Loading } from '@src/components/ui/Loading';
import Select from '@src/components/ui/Select';
import Textarea from '@src/components/ui/Textarea';
import { ROUTES } from '@src/constants/routes';
import { CategoryArea } from '@src/models/category-area.model';
import { Category } from '@src/models/category.model';
import { Product, SPU } from '@src/models/product.model';
import { categoryAreaService } from '@src/services/category-area.service';
import { categoryService } from '@src/services/category.service';
import { productService } from '@src/services/product.service';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import './ProductItemForm.css';
import { IoCloudUpload } from 'react-icons/io5';

// Basic Info Types & Component
interface BasicInfo {
  name: string;
  description: string;
  measurements: string;
  categoryId: number;
  categoryAreaId: number;
  image?: File | string;
}

interface BasicInfoFormProps {
  value: BasicInfo;
  onChange: (value: BasicInfo) => void;
  categories: Category[];
  categoryAreas: CategoryArea[];
  onImageRemove: () => void;
}

const BasicInfoForm = ({
  value,
  onChange,
  categories,
  categoryAreas,
  onImageRemove,
}: BasicInfoFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => {
    if (value.image) {
      if (typeof value.image === 'string') {
        setPreviewUrl(value.image);
      } else {
        const objectUrl = URL.createObjectURL(value.image);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }
    }
  }, [value.image]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value: inputValue } = e.target;
    onChange({
      ...value,
      [name]: inputValue,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({
        ...value,
        image: file,
      });
    }
  };

  const handleRemoveImage = async () => {
    onChange({
      ...value,
      image: undefined,
    });
    setPreviewUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageRemove();
  };

  return (
    <>
      {/* Basic Information */}
      <div className="form-section">
        <h2 className="form-section__title">Basic Information</h2>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={value.name}
            onChange={handleChange}
            required
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            name="description"
            value={value.description}
            onChange={handleChange}
            required
            placeholder="Enter product description"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          {!previewUrl ? (
            <div className="image-upload" onClick={handleImageClick}>
              <IoCloudUpload size={40} className="image-upload__icon mx-auto" />
              <div className="image-upload__text">Click to upload image</div>
              <div className="image-upload__hint">PNG, JPG up to 5MB</div>
            </div>
          ) : (
            <div className="image-upload-preview">
              <div className="image-preview">
                <img src={previewUrl} alt="Preview" />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleRemoveImage}
                className="image-preview__remove"
              >
                Remove Image
              </Button>
            </div>
          )}
        </div>

        {/* Categorization */}
        <div className="form-section">
          <h2 className="form-section__title">Categorization</h2>
          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <Select
              id="categoryId"
              name="categoryId"
              value={value.categoryId.toString()}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="form-group">
            <label htmlFor="categoryAreaId">Category Area</label>
            <Select
              id="categoryAreaId"
              name="categoryAreaId"
              value={value.categoryAreaId.toString()}
              onChange={handleChange}
              required
            >
              <option value="">Select a category area</option>
              {categoryAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Specifications */}
        <div className="form-section">
          <h2 className="form-section__title">Specifications</h2>
          <div className="form-group">
            <label htmlFor="measurements">Measurements</label>
            <Input
              type="text"
              id="measurements"
              name="measurements"
              value={value.measurements}
              onChange={handleChange}
              required
              placeholder="e.g. 17 1/2x20 5/8"
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Variants Types & Components
interface Variant {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

interface VariantFormProps {
  variant: Variant;
  index: number;
  onNameChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onQuantityChange: (value: number) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const DEFAULT_VARIANT: Variant = {
  name: '',
  price: 0,
  quantity: 0,
};

const VariantForm = ({
  variant,
  index,
  onNameChange,
  onPriceChange,
  onQuantityChange,
  onRemove,
  canRemove,
}: VariantFormProps) => (
  <div className="spu-section">
    <div className="spu-section__header">
      <h3>Variant {index + 1}</h3>
      {canRemove && (
        <Button type="button" variant="ghost" onClick={onRemove}>
          Remove
        </Button>
      )}
    </div>

    <div className="form-group">
      <label htmlFor={`variant-name-${index}`}>Variant Name</label>
      <Input
        type="text"
        id={`variant-name-${index}`}
        value={variant.name}
        onChange={(e) => onNameChange(e.target.value)}
        required
        placeholder="Enter variant name"
      />
    </div>

    <div className="sku-section">
      <h4>SKU Information</h4>
      <div className="sku-group">
        <div className="form-group">
          <label htmlFor={`sku-price-${index}`}>Price</label>
          <Input
            type="number"
            id={`sku-price-${index}`}
            value={variant.price}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            required
            placeholder="Enter price"
          />
        </div>
        <div className="form-group">
          <label htmlFor={`sku-quantity-${index}`}>Quantity</label>
          <Input
            type="number"
            id={`sku-quantity-${index}`}
            value={variant.quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            required
            placeholder="Enter quantity"
          />
        </div>
      </div>
    </div>
  </div>
);

interface VariantsFormProps {
  variants: Variant[];
  onChange: (variants: Variant[]) => void;
}

const VariantsForm = ({ variants, onChange }: VariantsFormProps) => {
  const updateVariantAtIndex = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = variants.map((variant, i) =>
      i === index
        ? {
            ...variant,
            [field]: value,
          }
        : variant,
    );
    onChange(newVariants);
  };

  const addVariant = () => {
    onChange([...variants, { ...DEFAULT_VARIANT }]);
  };

  const removeVariant = (index: number) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="form-section">
      <div className="form-section__header">
        <h2 className="form-section__title">Product Variants</h2>
        <Button type="button" variant="outline" onClick={addVariant}>
          Add Variant
        </Button>
      </div>

      {variants.map((variant, index) => (
        <VariantForm
          key={index}
          variant={variant}
          index={index}
          onNameChange={(value) => updateVariantAtIndex(index, 'name', value)}
          onPriceChange={(value) => updateVariantAtIndex(index, 'price', value)}
          onQuantityChange={(value) => updateVariantAtIndex(index, 'quantity', value)}
          onRemove={() => removeVariant(index)}
          canRemove={index > 0}
        />
      ))}
    </div>
  );
};

interface ProductItemFormProps {
  product?: Product;
  spus?: SPU[];
  isUpdate?: boolean;
}

const ProductItemForm = ({ product, spus, isUpdate }: ProductItemFormProps) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryAreas, setCategoryAreas] = useState<CategoryArea[]>([]);
  const [isDeleteImage, setIsDeleteImage] = useState(false);

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: product?.name ?? '',
    description: product?.description ?? '',
    measurements: product?.measurements ?? '',
    categoryId: product?.categoryId ?? 0,
    categoryAreaId: product?.categoryAreaId ?? 0,
    image: product?.imageUrl ?? '',
  });

  const [variants, setVariants] = useState<Variant[]>(
    spus?.map((spu) => ({
      id: spu.id,
      name: spu.name,
      price: spu.price,
      quantity: spu.quantity,
    })) ?? [DEFAULT_VARIANT],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, categoryAreasRes] = await Promise.all([
        categoryService.getCategories(),
        categoryAreaService.getCategoryAreas(),
      ]);
      setCategories(categoriesRes);
      setCategoryAreas(categoryAreasRes);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { image, ...productData } = basicInfo;
      const productPayload = {
        ...productData,
        spus: variants.map((variant) => ({
          id: variant.id,
          name: variant.name,
          price: variant.price,
          quantity: variant.quantity,
        })),
      };

      let productId = null;
      if (isUpdate && product?.id) {
        if (isDeleteImage && product.imageUrl) {
          await productService.deleteProductImage(product.id);
        }

        await productService.updateProduct(product.id, productPayload);
        productId = product.id;
      } else {
        const createdProduct = await productService.createProduct(productPayload);
        productId = createdProduct.id;
      }

      if (image instanceof File) {
        await productService.uploadProductImage(productId, image);
      }

      alert(`Product ${isUpdate ? 'updated' : 'created'} successfully`);
    } catch (error) {
      console.error(`Failed to ${isUpdate ? 'update' : 'create'} product:`, error);
      alert(`Failed to ${isUpdate ? 'update' : 'create'} product`);
    } finally {
      setIsSubmitting(false);
    }

    if (!isUpdate) {
      navigate(ROUTES.DASHBOARD.PRODUCTS);
    }
  };

  return (
    <div className="product-form">
      {isSubmitting && <Loading />}
      <div className="product-form__header">
        <h1>{isUpdate ? 'Update' : 'Create'} Product</h1>
        <Button variant="outline" onClick={() => navigate(ROUTES.DASHBOARD.PRODUCTS)}>
          Back to Products
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="product-form__content">
        <BasicInfoForm
          value={basicInfo}
          onChange={setBasicInfo}
          categories={categories}
          categoryAreas={categoryAreas}
          onImageRemove={() => setIsDeleteImage(true)}
        />
        <VariantsForm variants={variants} onChange={setVariants} />
        <div className="form-actions">
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {isUpdate ? 'Update' : 'Create'} Product
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductItemForm;
