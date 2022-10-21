create view Dump as (select 
	cred.user_id, cred.user_name, cred.user_email, img.image_name, img.image_description, occu.current_occupation, occu.current_company, skls.skill_name, skls.skill_rating, webs.website_name, webs.website_url
from 
	user_credentials cred
left join 
	user_images img
on 
	img.user_email = cred.user_email
left join 
	user_occupation occu 
on
	img.user_email = occu.user_email
left join 
	user_skills skls 
on
	img.user_email = skls.user_email
left join 
	user_websites webs 
on
	img.user_email = webs.user_email);