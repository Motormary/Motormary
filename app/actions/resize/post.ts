"use server"

import { Convert } from "@/components/img-converter/img-converter"
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";

export function resizeImage({params, file}: {
    params: Convert
    file: File | DataTransferItem
}) {

}