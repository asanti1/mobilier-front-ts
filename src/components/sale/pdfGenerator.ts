/* disable es-lint*/
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Sale } from "../../interfaces/sale";
import { User } from "../../interfaces/user";

const generatePDF = (sale: Sale, user: User) => {
  const doc = new jsPDF();

  doc.setFontSize(25);
  doc.text("Mobilier", 20, 10);
  doc.setFontSize(15);
  doc.text("Thank you for your purchase!", 120, 10);
  doc.line(10, 12, 200, 12);

  doc.setFontSize(10);
  doc.text("Person who will receive: ", 10, 20);
  doc.text(`First Name: ${user.firstName}`, 10, 25);
  doc.text(`Last Name: ${user.lastName}`, 10, 30);
  doc.text(`Email: ${user.email}`, 10, 35);
  doc.text(`Phone: ${user.phone}`, 10, 40);

  doc.text("Delivery to address: ", 120, 20);
  doc.text(`Country: ${sale.address.country}`, 120, 25);
  doc.text(`State: ${sale.address.state}`, 120, 30);
  doc.text(`City: ${sale.address.city}`, 120, 35);
  doc.text(`Street: ${sale.address.street}`, 120, 40);
  doc.text(`Room Number: ${sale.address.roomNumber}`, 120, 45);

  doc.line(10, 50, 200, 50);
  const tableColumn = ["Item", "Total Cost", "Item Cost", "Quantity"];

  const tableRows: any = [];

  sale.shopList.forEach((shopItem) => {
    const itemData = [
      shopItem.name,
      `$ ${shopItem.cost}`,
      `$ ${shopItem.costPerItem}`,
      shopItem.quantity,
    ];
    tableRows.push(itemData);
  });

  autoTable(doc, { head: [tableColumn], body: tableRows, startY: 55 });
  doc.text(
    `Final cost: $ ${sale.totalItemCost}`,
    120,
    25 + 55 + tableRows.length * 10
  );

  doc.save("test");
};

export default generatePDF;
