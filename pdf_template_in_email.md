#How to Generate a PDF and send as a Attachment using Email.

**wkhtmltopdf** is a binary. which is need to install first to convert email template into a pdf by command
    ##apt-get install wkhtmltopdf

##After That install gem "wicked_pdf","0.7.7" to used it in rails.

now go to mailers and write this code for creating email attachment

```ruby
	  def tax_receipt(user,total,start_date,end_date)
	    mail(:subject => 'Your Receipt', :to => user.email, :from => "admin@checkintogive.com")  do |format|
            format.html
            format.pdf do
				 attachments["receipt.pdf"] = WickedPdf.new.pdf_from_string(
                render_to_string(:pdf => "receipt", :template => 'invoice_mailer/tax_receipt.pdf.erb') #this is a code for generating pdf template.
                )
		    end
    	end
	  end
 ```

	  and now create a **tax_receipt.pdf.erb** and put the html code which you need to be send as a PDF with attachment.



