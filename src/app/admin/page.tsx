"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("categories");
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    const [cats, prods, custs] = await Promise.all([
      supabase.from("categories").select("*").order("number"),
      supabase.from("products").select("*, categories(name)").order("order_index"),
      supabase.from("prime_customers").select("*").order("order_index"),
    ]);

    if (cats.data) setCategories(cats.data);
    if (prods.data) setProducts(prods.data);
    if (custs.data) setCustomers(custs.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-red-500 text-sm font-medium">
            Warning: This page is currently unauthenticated. Please secure it before deploying to production.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-8">
          {["categories", "products", "customers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 text-sm font-medium uppercase tracking-wider ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading data...</div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            {activeTab === "categories" && <CategoriesTab categories={categories} refresh={fetchData} />}
            {activeTab === "products" && <ProductsTab products={products} categories={categories} refresh={fetchData} />}
            {activeTab === "customers" && <CustomersTab customers={customers} refresh={fetchData} />}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Categories Tab ---
function CategoriesTab({ categories, refresh }: { categories: any[]; refresh: () => void }) {
  const [form, setForm] = useState({ name: "", number: "", description: "", slug: "", id: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await supabase.from("categories").update({
        name: form.name,
        number: parseInt(form.number),
        description: form.description,
        slug: form.slug,
      }).eq("id", form.id);
    } else {
      await supabase.from("categories").insert({
        name: form.name,
        number: parseInt(form.number),
        description: form.description,
        slug: form.slug,
      });
    }
    setForm({ name: "", number: "", description: "", slug: "", id: "" });
    setIsEditing(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category? All its products will be deleted as well.")) {
      await supabase.from("categories").delete().eq("id", id);
      refresh();
    }
  };

  const handleEdit = (cat: any) => {
    setForm({ name: cat.name, number: cat.number, description: cat.description, slug: cat.slug, id: cat.id });
    setIsEditing(true);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Category" : "Add New Category"}</h2>
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="border p-2 rounded" />
        <input required type="number" placeholder="Sidebar Number (e.g. 1)" value={form.number} onChange={e => setForm({...form, number: e.target.value})} className="border p-2 rounded" />
        <input required type="text" placeholder="Slug (unique)" value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="border p-2 rounded" />
        <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="border p-2 rounded md:col-span-2" />
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">{isEditing ? "Update" : "Add"} Category</button>
          {isEditing && <button type="button" onClick={() => { setIsEditing(false); setForm({ name: "", number: "", description: "", slug: "", id: "" }); }} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>}
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Categories</h2>
      <div className="divide-y">
        {categories.map(cat => (
          <div key={cat.id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-bold">|{cat.number.toString().padStart(2, '0')}| {cat.name}</p>
              <p className="text-sm text-gray-500">{cat.slug} - {cat.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Products Tab ---
function ProductsTab({ products, categories, refresh }: { products: any[]; categories: any[]; refresh: () => void }) {
  const [form, setForm] = useState({ name: "", category_id: "", subcategory: "", order_index: "", id: "" });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let image_url = null;
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from("product-images").upload(fileName, file);
      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(fileName);
        image_url = publicUrlData.publicUrl;
      } else {
        alert("Image upload failed: " + error?.message);
      }
    }

    const payload: any = {
      name: form.name,
      category_id: form.category_id,
      subcategory: form.subcategory || null,
      order_index: parseInt(form.order_index) || 0,
    };

    if (image_url) payload.image_url = image_url;

    if (isEditing) {
      await supabase.from("products").update(payload).eq("id", form.id);
    } else {
      await supabase.from("products").insert(payload);
    }

    setForm({ name: "", category_id: "", subcategory: "", order_index: "", id: "" });
    setFile(null);
    setIsEditing(false);
    setUploading(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this product?")) {
      await supabase.from("products").delete().eq("id", id);
      refresh();
    }
  };

  const handleEdit = (prod: any) => {
    setForm({ name: prod.name, category_id: prod.category_id, subcategory: prod.subcategory || "", order_index: prod.order_index, id: prod.id });
    setIsEditing(true);
  };

  // Group products by category
  const grouped = categories.map(cat => ({
    ...cat,
    products: products.filter(p => p.category_id === cat.id)
  }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Product" : "Add New Product"}</h2>
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required type="text" placeholder="Product Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="border p-2 rounded" />
        <select required value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} className="border p-2 rounded bg-white">
          <option value="" disabled>Select Category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input type="text" placeholder="Subcategory (optional)" value={form.subcategory} onChange={e => setForm({...form, subcategory: e.target.value})} className="border p-2 rounded" />
        <input type="number" placeholder="Order Index" value={form.order_index} onChange={e => setForm({...form, order_index: e.target.value})} className="border p-2 rounded" />
        <div className="border p-2 rounded md:col-span-2 flex items-center gap-4">
          <span className="text-sm text-gray-500">Image:</span>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
          {isEditing && !file && <span className="text-xs text-blue-500">Leave blank to keep existing image</span>}
        </div>
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" disabled={uploading} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">
            {uploading ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
          </button>
          {isEditing && <button type="button" onClick={() => { setIsEditing(false); setForm({ name: "", category_id: "", subcategory: "", order_index: "", id: "" }); }} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>}
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Products</h2>
      <div className="flex flex-col gap-8">
        {grouped.map((cat: any) => (
          <div key={cat.id}>
            <h3 className="font-bold text-gray-700 bg-gray-100 p-2 rounded">|{cat.number.toString().padStart(2, '0')}| {cat.name}</h3>
            {cat.products.length === 0 ? <p className="p-2 text-sm text-gray-500">No products</p> : (
              <div className="divide-y pl-4">
                {cat.products.map((prod: any) => (
                  <div key={prod.id} className="py-2 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {prod.image_url ? (
                        <img src={prod.image_url} alt="" className="w-10 h-10 object-contain bg-gray-50 border rounded" />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded text-xs text-gray-500">N/A</div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{prod.name}</p>
                        <p className="text-xs text-gray-500">{prod.subcategory || "No subcategory"} (Order: {prod.order_index})</p>
                      </div>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <button onClick={() => handleEdit(prod)} className="text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(prod.id)} className="text-red-600 hover:underline">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Customers Tab ---
function CustomersTab({ customers, refresh }: { customers: any[]; refresh: () => void }) {
  const [form, setForm] = useState({ name: "", order_index: "", id: "" });
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let logo_url = null;
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from("customer-logos").upload(fileName, file);
      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from("customer-logos").getPublicUrl(fileName);
        logo_url = publicUrlData.publicUrl;
      } else {
        alert("Logo upload failed: " + error?.message);
      }
    }

    const payload: any = {
      name: form.name,
      order_index: parseInt(form.order_index) || 0,
    };

    if (logo_url) payload.logo_url = logo_url;

    if (isEditing) {
      await supabase.from("prime_customers").update(payload).eq("id", form.id);
    } else {
      await supabase.from("prime_customers").insert(payload);
    }

    setForm({ name: "", order_index: "", id: "" });
    setFile(null);
    setIsEditing(false);
    setUploading(false);
    refresh();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this customer?")) {
      await supabase.from("prime_customers").delete().eq("id", id);
      refresh();
    }
  };

  const handleEdit = (cust: any) => {
    setForm({ name: cust.name, order_index: cust.order_index, id: cust.id });
    setIsEditing(true);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Customer" : "Add New Customer"}</h2>
      <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required type="text" placeholder="Customer Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="border p-2 rounded" />
        <input type="number" placeholder="Order Index" value={form.order_index} onChange={e => setForm({...form, order_index: e.target.value})} className="border p-2 rounded" />
        <div className="border p-2 rounded md:col-span-2 flex items-center gap-4">
          <span className="text-sm text-gray-500">Logo:</span>
          <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
          {isEditing && !file && <span className="text-xs text-blue-500">Leave blank to keep existing logo</span>}
        </div>
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" disabled={uploading} className="bg-black text-white px-4 py-2 rounded disabled:opacity-50">
            {uploading ? "Saving..." : isEditing ? "Update Customer" : "Add Customer"}
          </button>
          {isEditing && <button type="button" onClick={() => { setIsEditing(false); setForm({ name: "", order_index: "", id: "" }); }} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>}
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">Existing Customers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(cust => (
          <div key={cust.id} className="border rounded-xl p-4 flex flex-col items-center text-center relative group">
            {cust.logo_url ? (
               <img src={cust.logo_url} alt={cust.name} className="h-16 object-contain mb-3" />
            ) : (
               <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400 font-bold">{cust.name[0]}</div>
            )}
            <p className="font-semibold text-sm line-clamp-1">{cust.name}</p>
            <p className="text-xs text-gray-500 mt-1">Order: {cust.order_index}</p>
            
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-1 rounded shadow-sm">
              <button onClick={() => handleEdit(cust)} className="text-blue-600 hover:text-blue-800"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
              <button onClick={() => handleDelete(cust.id)} className="text-red-600 hover:text-red-800"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
