import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3'

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const accessKeyId = process.env.R2_ACCESS_KEY_ID
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
const bucketName = process.env.R2_BUCKET_NAME
const endpoint = process.env.R2_ENDPOINT
const publicUrl = process.env.R2_PUBLIC_URL

function getR2Client(): S3Client {
  if (!accessKeyId || !secretAccessKey || !endpoint || !bucketName) {
    throw new Error(
      'Missing R2 configuration: R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_ENDPOINT, R2_BUCKET_NAME must be set'
    )
  }

  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey
    },
    forcePathStyle: true
  })
}

/**
 * Upload a file buffer to Cloudflare R2
 * @param buffer - File content as Buffer
 * @param key - Object key (e.g. "uploads/uuid.png")
 * @param contentType - MIME type of the file
 * @returns Public URL of the uploaded file
 */
export async function uploadToR2(
  buffer: Buffer,
  key: string,
  contentType: string
): Promise<string> {
  if (!publicUrl) {
    throw new Error('R2_PUBLIC_URL must be set for public file URLs')
  }

  const client = getR2Client()

  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType
    })
  )

  const baseUrl = publicUrl.replace(/\/$/, '')
  const normalizedKey = key.startsWith('/') ? key.slice(1) : key
  return `${baseUrl}/${normalizedKey}`
}

/**
 * Delete a file from Cloudflare R2
 * @param key - Object key (e.g. "uploads/uuid.png" or full URL)
 */
export async function deleteFromR2(keyOrUrl: string): Promise<void> {
  const client = getR2Client()

  // Extract key from URL if full URL was passed
  let key = keyOrUrl
  if (keyOrUrl.startsWith('http://') || keyOrUrl.startsWith('https://')) {
    try {
      const url = new URL(keyOrUrl)
      key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname
    } catch {
      return
    }
  } else if (keyOrUrl.startsWith('/')) {
    key = keyOrUrl.slice(1)
  }

  // Don't delete local /uploads/ paths - they're not in R2
  if (keyOrUrl.startsWith('/uploads/') && !keyOrUrl.startsWith('http')) {
    return
  }

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key
    })
  )
}

/**
 * Check if a URL points to R2 storage (vs local /uploads/)
 */
export function isR2Url(url: string): boolean {
  if (!url || !publicUrl) return false
  return url.startsWith(publicUrl) || url.includes('r2.dev')
}
