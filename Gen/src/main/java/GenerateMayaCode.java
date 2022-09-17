import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.ClassPathResource;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class GenerateMayaCode {

    static Document document = null;

    public static void main(String[] args) {

        if (args == null || args.length == 0) {
            throw new IllegalArgumentException("program argument is empty.");
        }
        String fileName = args[0];
        try {
            File file = getResourceFile(System.getProperty("user.dir")+"/xml/" + fileName);
            init(file);
            // JAVA
            generateEntity();
            generateDTO();
            generateController();
            generateRepository();
            generateJavaServiceInterface();
            generateJavaServiceImpl();

            // Typescript
            generateTypeScriptDTO();
            generateComponent();
            generateService();
            generateHTML();
            generatePopup();
            generatePopupComp();
            generateCSS();
            generatePopupService();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void generateCSS() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();
        String entityNameL = (entityName.charAt(0)+entityName.substring(1).replaceAll("([A-Z])", "-$1")).toLowerCase();

        File folder = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+entityNameL.toLowerCase());

        if(!folder.exists()){
            folder.mkdir();
            System.out.println("type folder created.");
        }

        File popupFolder = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+entityNameL.toLowerCase()+"\\"+entityNameL.toLowerCase()+"-popup");
        if(!popupFolder.exists()){
            popupFolder.mkdir();
            System.out.println("type folder created.");
        }

        File newFileTopopup = new File(popupFolder.getAbsolutePath() + "\\"+entityNameL.toLowerCase()+"-popup.component.scss");

        generateFileFromStr("", newFileTopopup);

        File newFileToComp = new File(folder.getAbsolutePath() + "\\"+entityNameL.toLowerCase()+".component.scss");

        generateFileFromStr("", newFileToComp);

    }

    private static void generatePopupService() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();

        String repositoryStr = "  show{entityName}Popup(context: {entityName}PopupContext) {\n" +
                "    return this.dialog.open({entityName}PopupComponent, context);\n" +
                "  }";

        repositoryStr = repositoryStr.replace("{entityName}", entityName);

        generateFileFromStr(repositoryStr, entityName + "addedFile", "ts");
        System.out.println("Generate repository: " + entityName + " done.");
    }

    private static void generateJavaServiceImpl() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();
        String entityComment = document.getElementsByTagName("comment").item(0).getTextContent();

        String repositoryStr = "package hu.maya.apps.services;\n" +
                "\n" +
                "import hu.maya.apps.configuration.ObjectMapper;\n" +
                "import hu.maya.apps.dto.{entityName}DTO;\n" +
                "import hu.maya.apps.models.{entityName};\n"+
                "import hu.maya.apps.repository.HouseRepository;\n"+
                "import hu.maya.apps.repository.{entityName}Repository;\n" +
                "import hu.maya.apps.shared.AbstractCommonCrudService;\n" +
                "import org.springframework.beans.factory.annotation.Autowired;\n" +
                "import org.springframework.stereotype.Service;\n" +
                "import hu.maya.apps.models.House;\n"+
                "\n" +
                "import java.util.List;\n" +
                "\n" +
                "@Service\n" +
                "public class {entityName}ServiceImpl extends AbstractCommonCrudService<{entityName}DTO> implements {entityName}Service{\n" +
                "\n" +
                "    private ObjectMapper objectMapper;\n" +
                "    private HouseRepository houseRepository;\n" +
                "    private {entityName}Repository repository;\n" +

                "\n" +
                "    @Autowired\n" +
                "    public {entityName}ServiceImpl({entityName}Repository repository,\n"
                +"                                    HouseRepository houseRepository,\n"+
                "                                ObjectMapper objectMapper) {\n" +
                "        super(objectMapper, repository);\n" +
                "        this.objectMapper = objectMapper;\n" +
                "        this.houseRepository = houseRepository;\n" +
                "        this.repository = repository;\n"+
                "    }\n" +
                "\n" +
                "\n" +
                "\n"+
                " @Override\n" +
                "    public {entityName}DTO save({entityName}DTO {entityNameL}DTO, Long houseId) {\n" +
                "       {entityName} {entityNameL} = null;\n" +
                "       House house = houseRepository.findById(houseId).get();\n" +
                "\n" +
                "        // Új {comment}\n" +
                "        if({entityNameL}DTO.getId() == null){\n" +
                "            {entityNameL} = objectMapper.map({entityNameL}DTO, {entityName}.class);\n" +
                "            {entityNameL}.setHouse(house);\n" +
                "            {entityNameL} = repository.save({entityNameL});\n" +
                "        }else {\n" +
                "            // meglévő {comment} módositása\n" +
                "            {entityNameL} = repository.findById({entityNameL}DTO.getId()).get();\n" +
                "            objectMapper.map({entityNameL}DTO, {entityNameL});\n" +
                "            repository.save({entityNameL});\n" +
                "        }\n" +
                "\n" +
                "        return objectMapper.map({entityNameL}, {entityName}DTO.class);\n" +
                "    }\n" +
                "\n" +
                "\n"+
                "  @Override\n" +
                "    public List<{entityName}DTO> findByHouseId(Long houseId) {\n" +
                "        return objectMapper.mapAsList(repository.find{entityName}ByHouseId(houseId), {entityName}DTO.class);\n" +
                "    }\n"+
                "    @Override\n" +
                "    public Boolean delete(Long {entityNameL}Id) {\n" +
                "\n" +
                "        {entityName} {entityNameL} = repository.findById({entityNameL}Id).get();\n" +
                "\n" +
                "        if({entityNameL} != null){\n" +
                "           repository.delete({entityNameL});\n" +
                "            return Boolean.TRUE;\n" +
                "        }\n" +
                "        return Boolean.FALSE;\n" +
                "    }\n"+
                "    @Override\n" +
                "    protected Class<{entityName}DTO> getDTOClass() {\n" +
                "        return {entityName}DTO.class;\n" +
                "    }\n" +
                "}\n";

        repositoryStr = repositoryStr.replace("{entityName}", entityName).replace("{entityNameL}", entityName.toLowerCase());
        repositoryStr = repositoryStr.replace("{comment}", entityComment);

        File newFile = new File("c:/works/MayaBE/src/main/java/hu/maya/apps/services/"+entityName+"ServiceImpl.java");

        generateFileFromStr(repositoryStr,  newFile);
        System.out.println("Generate repository: " + entityName + " done.");
    }

    private static void generateJavaServiceInterface() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();

        String repositoryStr = "package hu.maya.apps.services;\n" +
                "\n" +
                "import hu.maya.apps.dto.{entityName}DTO;\n" +
                "import hu.maya.apps.shared.CommonCrudService;\n" +
                "\n" +
                "import java.util.List;\n" +
                "\n" +
                "public interface {entityName}Service extends CommonCrudService<{entityName}DTO> {\n" +
                "\n"+
                "{entityName}DTO save({entityName}DTO {entityNameL}DTO, Long houseId);\n"+
                "List<{entityName}DTO> findByHouseId(Long houseId);\n"+
                "}\n";

        repositoryStr = repositoryStr.replace("{entityName}", entityName).replace("{entityNameL}", entityName.toLowerCase());

        File newFile = new File("c:/works/MayaBE/src/main/java/hu/maya/apps/services/"+entityName+"Service.java");

        generateFileFromStr(repositoryStr, newFile);
        System.out.println("Generate repository: " + entityName + " done.");
    }

    private static void generatePopupComp() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();

        String entityNameL = (entityName.charAt(0)+entityName.substring(1).replaceAll("([A-Z])", "-$1")).toLowerCase();

        String htmlStr = "import {Component, Inject, OnInit } from '@angular/core';\n" +
                "import {FormBuilder, FormGroup, Validators} from '@angular/forms';\n" +
                "import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';\n" +
                "import {CodeTableService} from '../../../../shared/services/code-table.service';\n" +
                "import {AbstractPopupComponent} from '../../../../shared/component/abstract-popup-component';\n" +
                "\n" +
                "export class "+entityName+"PopupContext extends MatDialogConfig {\n" +
                "\n" +
                "  onSave = {};\n" +
                "\n" +
                "   constructor(data: any = {},\n" +
                "              width?: string,\n" +
                "              onSave?: () => any) {\n" +
                "    super();\n" +
                "    this.data = data;\n" +
                "    this.width = data.width;\n" +
                "    this.onSave = data.onSave;\n" +
                "    this.hasBackdrop = true;\n" +
                "    this.disableClose = false;\n" +
                "    this.closeOnNavigation = true;\n" +
                "  }\n" +
                "}\n" +
                "\n" +
                "@Component({\n" +
                "  selector: 'app-{entityNameL}-popup',\n" +
                "  templateUrl: './{entityNameL}-popup.component.html',\n" +
                "  styleUrls: ['./{entityNameL}-popup.component.scss']\n" +
                "})\n" +
                "export class "+entityName+"PopupComponent extends AbstractPopupComponent<"+entityName+"PopupComponent> implements OnInit {\n" +
                "\n" +
                "\n" +
                "  constructor(private fb: FormBuilder,\n" +
                "              @Inject(MAT_DIALOG_DATA) public ctx,\n" +
                "              public dialogRef: MatDialogRef<"+entityName+"PopupComponent>) {\n" +
                "    super(ctx, dialogRef);\n" +
                "  }\n\n" +
                "ngOnInit(): void {\n" +
                "    super.init();\n}" +
                "\n" +
                "\n" +
                "\n" +
                "  protected newFormGroup(): FormGroup {\n" +
                "    return this.fb.group({" +
                "    {formGroupFields}" +
                "    \n\t});\n" +
                "  }\n" +
                "\n" +
                " }";


            htmlStr = addFormgroupField(htmlStr);

            htmlStr = htmlStr.replace("{entityNameL}", entityNameL);


        File folder = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+entityNameL.toLowerCase());

        if(!folder.exists()){
            folder.mkdir();
            System.out.println("type folder created.");
        }

        File popupFolder = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+entityNameL.toLowerCase()+"\\"+entityNameL.toLowerCase()+"-popup");
        if(!popupFolder.exists()){
            popupFolder.mkdir();
            System.out.println("type folder created.");
        }

        File newFile = new File(popupFolder.getAbsolutePath() + "\\"+entityNameL.toLowerCase()+"-popup.component.ts");

        generateFileFromStr(htmlStr, newFile);


        System.out.println("Generate ts popup component " + entityName + " done.");
    }

    private static void generatePopup() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();
        String entityComment = document.getElementsByTagName("comment").item(0).getTextContent();
        String entityNameL = (entityName.charAt(0)+entityName.substring(1).replaceAll("([A-Z])", "-$1")).toLowerCase();

        String htmlStr = "<mat-card id=\"card\" style=\"text-align: center;\">\n" +
                "  <mat-card-header>\n" +
                "    <mat-card-title>Új "+entityComment+" felvétele</mat-card-title>\n" +
                "  </mat-card-header>\n" +
                "  <mat-card-content>\n" +
                "    <form [formGroup]=\"formGroup\">\n" +
                "      <div fxLayout=\"row\" fxLayoutGap=\"30px\">\n" +
                "        <div fxLayout=\"column\" fxLayoutGap=\"30px\">";

        NodeList nList = document.getElementsByTagName("field");
        for (int temp = 0; temp < nList.getLength(); temp++) {
            Node nNode = nList.item(temp);
            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;
                String fieldName = eElement.getElementsByTagName("fieldName").item(0).getTextContent();
                String fieldType = eElement.getElementsByTagName("fieldType").item(0).getTextContent();
                String comment = eElement.getElementsByTagName("comment").item(0).getTextContent();

                if("Date".equals(fieldType)){
                    htmlStr += "\n<app-datepicker-field\n" +
                            "     [label]=\"'"+comment+":'\"\n" +
                            "     formControlName=\""+fieldName+"\">\n" +
                            "   </app-datepicker-field>";
                } else if("String".equals(fieldType)) {
                    htmlStr += "          \n<app-input-field\n" +
                            "            [label]=\"'"+comment+"'\"\n" +
                            "            formControlName=\""+fieldName+"\"\n" +
                            "            [maxlength]=\"20\"\n" +
                            "          >\n" +
                            "          </app-input-field>";
                }else if("Long".equals(fieldType)) {
                    htmlStr += "       \n<app-input-field\n" +
                            "            [label]=\"'"+comment+"'\"\n" +
                            "            [required]=\"true\"\n" +
                            "            formControlName=\""+fieldName+"\"\n" +
                            "            [maxlength]=\"100\"\n" +
                            "            [type]=\"'number'\"\n" +
                            "          >\n" +
                            "          </app-input-field>";
                }
            }
        }

        htmlStr += "        </div>\n" +
                "      </div>\n" +
                "    </form>\n" +
                "  </mat-card-content>\n" +
                "  <mat-card-actions>\n" +
                "    <button mat-raised-button (click)=\"create()\" color=\"primary\">Mentés</button>\n" +
                "    <button mat-raised-button (click)=\"cancel()\" color=\"primary\">Mégse</button>\n" +
                "  </mat-card-actions>\n" +
                "</mat-card>\n";


        File folder = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+entityNameL.toLowerCase());

        if(!folder.exists()){
            folder.mkdir();
            System.out.println("type folder created.");
        }

       File popupFolder = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+entityNameL.toLowerCase()+"\\"+entityNameL.toLowerCase()+"-popup");
        if(!popupFolder.exists()){
            popupFolder.mkdir();
            System.out.println("type folder created.");
        }

        File newFile = new File(popupFolder.getAbsolutePath() + "\\"+entityNameL.toLowerCase()+"-popup.component.html");

        generateFileFromStr(htmlStr, newFile);

        System.out.println("Generate html popup component " + entityNameL + " done.");
    }

    private static void generateHTML() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();
        String entityComment = document.getElementsByTagName("comment").item(0).getTextContent();

        String htmlStr = "<table mat-table [dataSource]=\"dataSource\" matSort class=\"mat-elevation-z8\">\n";
        // columnNames
        NodeList nList = document.getElementsByTagName("field");


        for (int temp = 0; temp < nList.getLength(); temp++) {
            Node nNode = nList.item(temp);
            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;
                String fieldName = eElement.getElementsByTagName("fieldName").item(0).getTextContent();
                String comment = eElement.getElementsByTagName("comment").item(0).getTextContent();


                if(eElement.getElementsByTagName("dtoType").item(0)==null) {
                    htmlStr += "<ng-container matColumnDef=\""+fieldName+"\">\n" +
                            "       <th mat-header-cell *matHeaderCellDef mat-sort-header>"+comment+"</th>\n" +
                            "       <td mat-cell *matCellDef=\"let element\"> {{element."+fieldName+"}}</td>\n" +
                            "   </ng-container>\n";
                }
            }
        }

        htmlStr+="  <ng-container matColumnDef=\"edit\">\n" +
                "    <th mat-header-cell *matHeaderCellDef></th>\n" +
                "    <td mat-cell *matCellDef=\"let element, let index=index\">\n" +
                "      <button mat-button (click)=\"selectedRow(element)\">\n" +
                "        <mat-icon>edit</mat-icon>\n" +
                "      </button>\n" +
                "    </td>\n" +
                "  </ng-container>\n" +
                "  <ng-container matColumnDef=\"delete\">\n" +
                "    <th mat-header-cell *matHeaderCellDef mat-sort-header></th>\n" +
                "    <td mat-cell *matCellDef=\"let element\">\n" +
                "      <button mat-button (click)=\"delete"+entityName+"(element?.id)\">\n" +
                "        <mat-icon>delete</mat-icon>\n" +
                "      </button>\n" +
                "    </td>\n" +
                "  </ng-container>";


        htmlStr+= "  <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n" +
                "  <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n" +
                "</table>\n" +
                "<mat-paginator [pageSizeOptions]=\"[5, 10, 20]\" showFirstLastButtons></mat-paginator>\n" +
                "<div fxLayout=\"row\" fxLayoutGap=\"20px\">\n" +
                "  <button mat-button (click)=\"createNew()\">Új "+entityComment+"</button>\n" +
                "</div>\n";

        String entityNameL = (entityName.charAt(0)+entityName.substring(1).replaceAll("([A-Z])", "-$1")).toLowerCase();

        File folder = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+entityNameL.toLowerCase());

        if(!folder.exists()){
            folder.mkdir();
            System.out.println("type folder created.");
        }

        File newFile = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+folder.getName()+"\\"+entityNameL.toLowerCase() + ".component.html");

        generateFileFromStr(htmlStr, newFile);

        System.out.println("Generate html component " + entityNameL + " done.");

    }

    private static void generateService() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();
        String entityNameUL = (entityName.charAt(0)+entityName.substring(1).replaceAll("([A-Z])", "_$1")).toUpperCase();

        String serviceStr = "import { Injectable } from '@angular/core';\n" +
                "import {DefaultSavableMemberService} from '../../../shared/component/default-savable-member-service';\n" +
                "import {HttpClient} from \"@angular/common/http\";\n" +
                "import {{entityName}DTO} from '../../../models/{entityName}DTO';\n\n"+
                "\n" +
                "@Injectable({\n" +
                "  providedIn: 'root'\n" +
                "})\n" +
                "export class {entityName}Service extends DefaultSavableMemberService<{entityName}DTO>{\n" +
                "\n" +
                "  static {entityNameUL}_URL = '/house/{entityNameL}';\n" +
                "\n" +
                "  constructor(http: HttpClient) {\n" +
                "    super(http);\n" +
                "  }\n" +
                "\n" +
                "\n" +
                "  getResourceUrl(): string {\n" +
                "    return {entityName}Service.{entityNameUL}_URL;\n" +
                "  }\n" +
                "\n" +
                "}\n";

        serviceStr = serviceStr.replace("{entityName}", entityName);
        serviceStr = serviceStr.replace("{entityNameU}", entityName.toUpperCase());
        serviceStr = serviceStr.replace("{entityNameL}", entityName.toLowerCase());
        serviceStr = serviceStr.replace("{entityNameUL}", entityNameUL);

        String entityNameL = (entityName.charAt(0)+entityName.substring(1).replaceAll("([A-Z])", "-$1")).toLowerCase();

        File folder = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+entityNameL.toLowerCase());

        if(!folder.exists()){
            folder.mkdir();
            System.out.println("type folder created.");
        }

        File newFile = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+folder.getName()+"\\"+entityNameL.toLowerCase() + ".service.ts");

        generateFileFromStr(serviceStr, newFile);

        System.out.println("Generate typescript component " + entityNameL + " done.");
    }

    private static void generateComponent() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();
        String entityNameLL = (entityName.charAt(0)+entityName.substring(1).replaceAll("([A-Z])", "-$1")).toLowerCase();

        String componentStr = "import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';\n" +
                "import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';\n" +
                "import {{entityName}DTO} from '../../../models/{entityName}DTO';\n" +
                "import {ConfirmDialogPopupContext} from '../../../shared/component/popup/confirm-dialog/confirm-dialog.component';\n" +
                "import {{entityName}PopupContext} from './{entityNameLL}-popup/{entityNameLL}-popup.component';\n" +
                "import {MatPaginator} from '@angular/material/paginator';\n" +
                "import {MatTableDataSource} from '@angular/material/table';\n" +
                "import {MatSort} from '@angular/material/sort';\n" +
                "import {MatDialog} from '@angular/material/dialog';\n" +
                "import {{entityName}Service} from './{entityNameLL}.service';\n" +
                "import {AbstractHouseComponent} from '../abstract-house-component';\n" +
                "import {MatSnackBarComponent} from '../../../shared/component/mat-snack-bar/mat-snack-bar.component';\n" +
                "import {HouseDataService} from '../house-data.service';\n" +
                "import {PopupService} from '../../../shared/services/popup.service';" +
                "\n\n" +
                "@Component({\n" +
                "  selector: 'app-{entityNameLL}',\n" +
                "  templateUrl: './{entityNameLL}.component.html',\n" +
                "  styleUrls: ['./{entityNameLL}.component.scss'],\n" +
                "  providers: [\n" +
                "    {\n" +
                "      provide: NG_VALUE_ACCESSOR,\n" +
                "      useExisting: forwardRef(() => {entityName}Component),\n" +
                "      multi: true\n" +
                "    }\n" +
                "  ]\n" +
                "})\n" +
                "export class {entityName}Component extends AbstractHouseComponent<{entityName}DTO> implements OnInit {\n" +
                "  public displayedColumns = [{columnNames} 'edit', 'delete'];\n" +
                "  public dataSource = new MatTableDataSource<any>();\n" +
                "\n" +
                "  @ViewChild(MatPaginator) paginator: MatPaginator;\n" +
                "  @ViewChild(MatSort) sort: MatSort;\n" +
                "\n" +
                "\n" +
                "  constructor(private popupService: PopupService,\n" +
                "              houseDataService: HouseDataService,\n" +
                "              private {entityNameL}Service: {entityName}Service,\n" +
                "              matSnackBarComponent: MatSnackBarComponent,\n" +
                "              public dialog: MatDialog,\n" +
                "              private fb: FormBuilder) {\n" +
                "    super({entityNameL}Service, houseDataService, matSnackBarComponent);\n" +
                "    this.dataSource.paginator = this.paginator;\n" +
                "    this.dataSource.sort = this.sort;\n" +
                "  }\n" +
                "\n" +
                "  ngOnInit() {\n" +
                "    super.ngOnInit();\n" +
                "       this.load{entityName}();"+
                "  }\n" +
                "\n" +
                "  protected newFormGroup(): FormGroup {\n" +
                "    return this.fb.group({" +
                "    {formGroupFields}" +
                "    \n\t});\n" +
                "  }\n" +
                "\n" +
                "\n" +
                "  delete{entityName}(id) {\n" +
                "    const dialogRef = this.popupService.showConfirmDialog(new ConfirmDialogPopupContext({\n" +
                "        title: 'Figyelmeztetés!',\n" +
                "        msg: 'Valóban törli?'\n" +
                "      }\n" +
                "    )).afterClosed().subscribe((mustDel) => {\n" +
                "      if (mustDel) {\n" +
                "        this.delete(id).subscribe((ok) => {\n" +
                "          this.load{entityName}();\n" +
                "        });\n" +
                "      }\n" +
                "    });\n" +
                "  }\n" +
                "\n" +
                "\n" +
                "  modify({entityNameL}?) {\n" +
                "    this.popupService.show{entityName}Popup(new {entityName}PopupContext(      {\n" +
                "        width: '30%',\n" +
                "        data: {entityNameL},\n" +
                "        onSave: (modified{entityName}?) => {\n" +
                "          this.patchValue(modified{entityName});\n" +
                "          this.save(this.houseId)\n" +
                "            .do((ok) => {\n" +
                "              if (ok){\n" +
                "                this.load{entityName}();\n" +
                "              }\n" +
                "            })\n" +
                "            .subscribe();\n" +
                "        }\n" +
                "      }\n" +
                "    ));\n" +
                "  }\n" +
                "\n" +
                "  createNew() {\n" +
                "    this.popupService.show{entityName}Popup(new {entityName}PopupContext(      {\n" +
                "      width: '30%',\n" +
                "      onSave: ({entityNameL}?) => {\n" +
                "        this.patchValue({entityNameL});\n" +
                "        this.save(this.houseId)\n" +
                "          .do((ok) => {\n" +
                "            if (ok){\n" +
                "              this.load{entityName}();\n" +
                "            }\n" +
                "          })\n" +
                "          .subscribe();\n" +
                "      }\n" +
                "    }\n" +
                "  ));\n" +
                "  }\n" +
                "\n"+
                "  load{entityName}(){\n" +
                "    this.list(this.houseId).subscribe(data => {\n" +
                "      this.dataSource.data = data;\n" +
                "    });\n" +
                "  }\n"+
                "  updateDS() {\n" +
                "    this.dataSource.data = this.value;\n" +
                "  }\n" +
                "}\n" +
                "\n";

        componentStr = componentStr.replace("{entityName}", entityName).replace("{entityNameL}", entityName.toLowerCase())
                .replace("{entityNameLL}", entityNameLL);

        componentStr = addFormgroupField(componentStr);


        File folder = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+entityNameLL.toLowerCase());

        if(!folder.exists()){
            folder.mkdir();
            System.out.println("type folder created.");
        }

        File newFile = new File("C:\\works\\MayaFE\\src\\app\\secured\\house\\"+folder.getName()+"\\"+entityNameLL.toLowerCase() + ".component.ts");

        generateFileFromStr(componentStr, newFile);

        System.out.println("Generate typescript component " + entityNameLL + " done.");
    }

    private static String addFormgroupField(String componentStr) {
        // columnNames
        NodeList nList = document.getElementsByTagName("field");

        String columnNames = "";
        String formGroupFields = "";

        for (int temp = 0; temp < nList.getLength(); temp++) {
            Node nNode = nList.item(temp);
            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;
                String fieldName = eElement.getElementsByTagName("fieldName").item(0).getTextContent();
                String comment = eElement.getElementsByTagName("comment").item(0).getTextContent();

                if(eElement.getElementsByTagName("dtoType").item(0)==null) {
                    columnNames += "\'" + fieldName + "\',";
                }
                formGroupFields += "\n\t\t"+fieldName+": [null], // "+comment;

            }
        }

        componentStr = componentStr.replace("{columnNames}", columnNames);
        componentStr = componentStr.replace("{formGroupFields}", formGroupFields);
        return componentStr;
    }

    private static void generateTypeScriptDTO() {

        String entityFileContentStr = "import {SavableResource} from '../shared/component/savable-resource';\n" +
                "/**\n" +
                " * {comment}\n" +
                " */\n" +
                "export interface {entityName} extends SavableResource{";

        String entityComment = document.getElementsByTagName("comment").item(0).getTextContent();
        String originEntityName = document.getElementsByTagName("entityName").item(0).getTextContent();
        String entityName =  originEntityName+ "DTO";

        entityFileContentStr = entityFileContentStr.replace("{comment}", entityComment).replace("{entityName}", entityName);
        NodeList nList = document.getElementsByTagName("field");

        for (int temp = 0; temp < nList.getLength(); temp++) {
            Node nNode = nList.item(temp);
            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;
                String fieldType = eElement.getElementsByTagName("fieldType").item(0).getTextContent();
                String fieldName = eElement.getElementsByTagName("fieldName").item(0).getTextContent();
                String comment = eElement.getElementsByTagName("comment").item(0).getTextContent();
                String dtoType = null;

                if(eElement.getElementsByTagName("dtoType").item(0)!=null){
                    dtoType = eElement.getElementsByTagName("dtoType").item(0).getTextContent();
                }else if("String".equals(fieldType)){
                    dtoType = "string";
                }else if("Date".equals(fieldType)){
                    dtoType = "Date";
                }else if("Boolean".equals(fieldType)){
                    dtoType = "boolean";
                }else if("Long".equals(fieldType)){
                    dtoType = "number";
                }
                if(!fieldName.equals("house"))
                entityFileContentStr = entityFileContentStr.concat("\n\t" + fieldName + ":" + dtoType + "; \t\t\t// " + comment);
            }
        }

        entityFileContentStr = entityFileContentStr.concat("\n}");


        File newFile = new File("C:\\works\\MayaFE\\src\\app\\models\\"+entityName+".ts");
        generateFileFromStr(entityFileContentStr, newFile);

        System.out.println("Generate typescript dto" + entityName + " done.");

    }

    private static void generateRepository() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();

        String repositoryStr = "package hu.maya.apps.repository;\n" +
                "\n" +
                "import hu.maya.apps.models.{entityName};\n" +
                "import org.springframework.data.jpa.repository.JpaRepository;\n" +
                "import java.util.Optional;\n"+
                "\n" +
                "import java.util.List;\n" +
                "\n" +
                "public interface {entityName}Repository extends JpaRepository<{entityName}, Long> {\n" +
                "    List<{entityName}> find{entityName}ByHouseId(Long houseId);\n" +
                "    Optional<{entityName}> findById(Long id);\n" +
                "}\n";

        repositoryStr = repositoryStr.replace("{entityName}", entityName);

        File newFile = new File("c:/works/MayaBE/src/main/java/hu/maya/apps/repository/"+entityName+"Repository.java");
        generateFileFromStr(repositoryStr, newFile);
        System.out.println("Generate repository: " + entityName + " done.");

    }

    private static void init(File file) throws Exception {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        document = db.parse(file);
        document.getDocumentElement().normalize();

        File genFolder = new File("gen");
        if(!genFolder.exists()){
            genFolder.mkdir();
            System.out.println("Gen folder created.");
        }
    }

    private static void generateController() {
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();

        String controllerStr = "package hu.maya.apps.controllers;\n" +
                "\n" +
                "import hu.maya.apps.configuration.ObjectMapper;\n" +
                "import hu.maya.apps.dto.{entityName}DTO;\n" +
                "import hu.maya.apps.services.{entityName}Service;\n" +
                "import org.springframework.beans.factory.annotation.Autowired;\n" +
                "import org.springframework.http.MediaType;\n" +
                "import org.springframework.web.bind.annotation.*;\n" +
                "\n" +
                "import java.util.List;\n" +
                "\n" +
                "@CrossOrigin(origins = \"*\", maxAge = 3600)\n" +
                "@RestController\n" +
                "@RequestMapping(\"/api/house/{entityNameL}\")\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "public class {entityName}Controller {\n" +
                "\n" +
                "    private {entityName}Service " +
                "{entityName}Service;\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "    private ObjectMapper objectMapper;\n" +
                "\n" +
                "    @Autowired\n" +
                "    public {entityName}Controller({entityName}Service " +
                "{entityName}Service, ObjectMapper objectMapper) {\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "        this.{entityName}Service = {entityName}Service;\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "        this.objectMapper = objectMapper;\n" +
                "    }\n" +
                "\n" +
                "    @GetMapping(produces= MediaType.APPLICATION_JSON_VALUE)\n" +
                "    @ResponseBody\n" +
                "    public {entityName}DTO find{entityName}ById(@RequestParam(value = \"id\") " +
                "Long {entityName}Id){\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "        return this.{entityName}Service".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                ".findDTOsById({entityName}Id);\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "    }\n" +
                "\n" +
                "    @GetMapping(path = \"/list\", produces= MediaType.APPLICATION_JSON_VALUE)\n" +
                "    @ResponseBody\n" +
                "    public List<{entityName}DTO> getAll{entityName}(@RequestParam(value = \"id\") Long houseId){\n" +
                "        return this.{entityName}Service.findByHouseId(houseId);\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "    }\n" +
                "\n" +
                "    @PutMapping(produces= MediaType.APPLICATION_JSON_VALUE)\n" +
                "    @ResponseBody\n" +
                "    public {entityName}DTO save{entityName}(@RequestBody {entityName}DTO " +
                "{entityName}DTO, @RequestParam(value = \"id\") Long houseId){\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "        return this.{entityName}Service.save({entityName}DTO, houseId);\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "    }\n" +
                "\n" +
                "    @DeleteMapping(produces= MediaType.APPLICATION_JSON_VALUE)\n" +
                "    @ResponseBody\n" +
                "    public Boolean delete{entityName}(@RequestParam(value = \"id\")" +
                " Long {entityName}Id){\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "        return this.{entityName}Service.delete({entityName}Id);\n".replace("{entityName}",
                        (entityName.substring(0, 1).toLowerCase() + entityName.substring(1))) +
                "    }\n" +
                "\n" +
                "}\n";

        controllerStr = controllerStr.replace("{entityName}", entityName).replace("{entityName}", entityName.toLowerCase());
        File newFile = new File("c:/works/MayaBE/src/main/java/hu/maya/apps/controllers/"+entityName+"Controller.java");

        generateFileFromStr(controllerStr, newFile);

        System.out.println("Generate controller: " + entityName + " done.");

    }

    private static void generateDTO() throws Exception {

        String entityFileContentStr = "package hu.maya.apps.dto;\n" +
                "\n" +
                "import java.io.Serializable;\n" +
                "import java.util.Date;\n" +
                "import lombok.Data;\n" +
                "import lombok.EqualsAndHashCode;\n" +
                "import lombok.NoArgsConstructor;\n" +
                "import lombok.experimental.SuperBuilder;" +
                "\n" +
                "/**\n" +
                " * {comment}\n" +
                " */\n" +
                "@Data\n" +
                "@SuperBuilder\n" +
                "@NoArgsConstructor\n" +
                "@EqualsAndHashCode(callSuper = true)\n"+
                "public class {entityName} extends BaseDTO implements Serializable {\n ";

        String entityComment = document.getElementsByTagName("comment").item(0).getTextContent();
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent() + "DTO";

        entityFileContentStr = entityFileContentStr.replace("{comment}", entityComment).replace("{entityName}", entityName);
        NodeList nList = document.getElementsByTagName("field");

        for (int temp = 0; temp < nList.getLength(); temp++) {
            Node nNode = nList.item(temp);
            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;
                String fieldType = eElement.getElementsByTagName("fieldType").item(0).getTextContent();
                String fieldName = eElement.getElementsByTagName("fieldName").item(0).getTextContent();
                String comment = eElement.getElementsByTagName("comment").item(0).getTextContent();

                if ("Date".equals(fieldType)) {
                    entityFileContentStr = entityFileContentStr.concat("\n@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateUtil.SAMPLE_DATE_FORMAT)" +
                            "\nprivate " + fieldType + " " + fieldName + "; // " + comment);

                } else if(!fieldName.equals("house")){
                    entityFileContentStr = entityFileContentStr.concat("\nprivate " + fieldType + " " + fieldName + "; // " + comment);
                }
            }
        }
        File newFile = new File("c:/works/MayaBE/src/main/java/hu/maya/apps/dto/"+entityName+".java");

        generateFileFromStr(entityFileContentStr+"\n}", newFile);

        System.out.println("Generate " + entityName + " done.");
    }

    private static void generateEntity() throws Exception {
        String entityFileContentStr = "package hu.maya.apps.models;\n" +
                "\n" +
                "import javax.persistence.*;\n" +
                "import java.io.Serializable;\n" +
                "import java.util.Date;\n" +
                "import lombok.Data;\n" +
                "\n" +
                "/**\n" +
                " * {comment}\n" +
                " */\n" +
                "@Entity\n" +
                "@Data\n" +
                "@Table\n" +
                "public class {entityName} extends BaseEntity implements Serializable {\n ";

        String entityComment = document.getElementsByTagName("comment").item(0).getTextContent();
        String entityName = document.getElementsByTagName("entityName").item(0).getTextContent();

        entityFileContentStr = entityFileContentStr.replace("{comment}", entityComment).replace("{entityName}", entityName);
        NodeList nList = document.getElementsByTagName("field");

        for (int temp = 0; temp < nList.getLength(); temp++) {
            Node nNode = nList.item(temp);
            if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                Element eElement = (Element) nNode;
                String fieldType = eElement.getElementsByTagName("fieldType").item(0).getTextContent();
                String fieldName = eElement.getElementsByTagName("fieldName").item(0).getTextContent();
                String comment = eElement.getElementsByTagName("comment").item(0).getTextContent();

                // parent field
                if (eElement.getElementsByTagName("idName").item(0) != null) {
                    String idName = eElement.getElementsByTagName("idName").item(0).getTextContent();

                    entityFileContentStr = entityFileContentStr.concat("\n\n@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)" +
                            "\n@JoinColumn(name = \"" + idName + "\")");
                }
                entityFileContentStr = entityFileContentStr.concat("\nprivate " + fieldType + " " + fieldName + "; // " + comment);
            }
        }

        File newFile = new File("c:/works/MayaBE/src/main/java/hu/maya/apps/models/"+entityName+".java");

        generateFileFromStr(entityFileContentStr+"\n}", newFile);

        System.out.println("Generate " + entityName + " done.");
    }

    private static void generateFileFromStr(String entityFileContentStr, String fileName, String fileType) {
        File file = new File("gen/" + fileType + "/" + fileName + "." + fileType);
        generateFileFromStr(entityFileContentStr, file);
    }
   static List<File> files = new ArrayList<File>();
    private static void generateFileFromStr(String entityFileContentStr, File file) {
        FileWriter myWriter = null;
        try {

            File typeFolder = new File("gen/"+ FilenameUtils.getExtension(file.getName()));
            if(!typeFolder.exists()){
                typeFolder.mkdir();
                System.out.println("type folder created.");
            }

            if(file.exists()){
                file.delete();
                System.out.println("File deleted. "+ file.getName());
            }

            System.out.println("Create new file ->" + file.getName());
            file.createNewFile();
            files.add(file);
            myWriter = new FileWriter(file);
            myWriter.write(entityFileContentStr);

        } catch (Exception e) {
            e.printStackTrace();
            files.stream().forEach( removeFile ->{
                removeFile.delete();
            });
        } finally {
            if (myWriter != null) {
                try {
                    myWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private static File getResourceFile(final String fileName) throws Exception {
        File resource = new File(fileName);
        return resource;
    }
}
