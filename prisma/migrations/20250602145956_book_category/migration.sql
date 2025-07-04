-- AddForeignKey
ALTER TABLE "book_category" ADD CONSTRAINT "book_category_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_category" ADD CONSTRAINT "book_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
