document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/raw_material'); // แก้ไข URL ตามความเหมาะสม
        const raw_materials = await response.json(); 
      
        const raw_materialItems = document.getElementById('raw_materialItems'); // ตรวจสอบว่า ID 'raw_materialItems' มีอยู่ใน DOM

        raw_materials.forEach((raw_material) => { // ใช้ raw_materials แทน raw_material
           raw_materialItems.innerHTML += `<div class="product-card" data-id="${raw_material.rawmaterialid}">
                <img src="img/${raw_material.image}"class="product-card-image" alt="${raw_material.name}">
                <div class="product-card-content">
                    <h3 class="product-container">${raw_material.name}</h3>
                    <div class="product-card-footer">
                        <button class="cart-btn fas fa-shopping-bag">Add to Cart</button>
                    </div>
                </div>
            </div>`;
        });
    } catch (error) {
        console.error('Error fetching raw_materials:', error); // แสดงข้อความผิดพลาด
    }
});