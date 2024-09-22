# Evershop

## DB

- connect as root: `sudo -u postgres psql`
- `CREATE USER goodtrend PASSWORD 'xxx' CREATEDB;`
  - for pg 16, need to do `sudo vim /etc/postgresql/16/main/pg_hba.conf` and append `local   all             goodtrend                                md5`, then `sudo systemctl restart postgresql` to use the password otherwise will get `FATAL:  Peer authentication failed for user` error.
- `CREATE DATABASE my_evershop`
- connect in cli: `psql -U goodtrend -d my_evershop`
- disable ssl `sudo vim /etc/postgresql/14/main/postgresql.conf` and make `ssl = off`. The 14 is the current version, could be 15 or higher.

### list commands

- `\dt` to list table
- `\l` or `\list` to list database
- `\du` to list user

### data migration

#### export

- whole db: `pg_dump -U goodtrend -d my_evershop > my_evershop.sql`
- a specific table `pg_dump -U goodtrend -d my_evershop -t widget> widget.sql`

#### import

- drop db: `dropdb -U goodtrend my_evershop`
- create db: `createdb -U goodtrend my_evershop`
- whole db: `psql -U goodtrend -d my_evershop < my_evershop.sql`
- a specific table
  - `psql -U goodtrend -d my_evershop -c "TRUNCATE widget"`
  - `psql -U goodtrend -d my_evershop -f widget.sql`


### tables

Schema | Name | Type | Owner
--------+-------------------------------+-------+-----------
public | admin_user | table | goodtrend
public | attribute | table | goodtrend
public | attribute_group | table | goodtrend
public | attribute_group_link | table | goodtrend
public | attribute_option | table | goodtrend
public | cart | table | goodtrend
public | cart_address | table | goodtrend
public | cart_item | table | goodtrend
public | category | table | goodtrend
public | category_description | table | goodtrend
public | cms_page | table | goodtrend
public | cms_page_description | table | goodtrend
public | collection | table | goodtrend
public | coupon | table | goodtrend
public | customer | table | goodtrend
public | customer_address | table | goodtrend
public | customer_group | table | goodtrend
public | event | table | goodtrend
public | migration | table | goodtrend
public | order | table | goodtrend
public | order_activity | table | goodtrend
public | order_address | table | goodtrend
public | order_item | table | goodtrend
public | payment_transaction | table | goodtrend
public | product | table | goodtrend
public | product_attribute_value_index | table | goodtrend
public | product_collection | table | goodtrend
public | product_custom_option | table | goodtrend
public | product_custom_option_value | table | goodtrend
public | product_description | table | goodtrend
public | product_image | table | goodtrend
public | product_inventory | table | goodtrend
public | reset_password_token | table | goodtrend
public | session | table | goodtrend
public | setting | table | goodtrend
public | shipment | table | goodtrend
public | shipping_method | table | goodtrend
public | shipping_zone | table | goodtrend
public | shipping_zone_method | table | goodtrend
public | shipping_zone_province | table | goodtrend
public | tax_class | table | goodtrend
public | tax_rate | table | goodtrend
public | url_rewrite | table | goodtrend
public | variant_group | table | goodtrend

## S3

### public accessible bucket policy

Need to add a bucket policy to make the bucket public accessible, otherwise by default public does not have 'list' permission.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

## Deployment

[reference](https://evershop.io/docs/development/deployment/deploy-evershop-to-aws). need to setup ngnix and start service with pm2.

- `npm run build`
- `npm install -g pm2`
- `pm2 start npm -- start`

## Mail server

- domain name transfer [from namecheap to cloudflare](https://www.namecheap.com/support/knowledgebase/article.aspx/9607/2210/how-to-set-up-dns-records-for-your-domain-in-a-cloudflare-account/#:~:text=There%20are%20two%20ways).
  - SSL/TSL configuration: `Full(Strict)`, otherwise naked domain(without www) will probably get redirect loop for assets like js/css/images which results in site load incorrectly.
- Business Mail Setup: [cloudflare route with gmail](https://www.youtube.com/watch?v=aYObO0SETnw).


## scp sql files

- copy from remote to local: `scp user@your-ip:~/my_evershop.sql .`
- copy from local to remote: `scp my_evershop.sql user@your-ip:~/my_evershop.sql`