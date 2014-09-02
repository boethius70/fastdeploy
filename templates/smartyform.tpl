  <form {$form_data.attributes}>
    <!-- Display the fields -->
    <table>
      <tr>
        <th align=right>{$form_data.hostname.label}</th>
        <td align=left>{$form_data.hostname.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.domain.label}</th>
        <td align=left>{$form_data.domain.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.mac.label}</th>
        <td align=left>{$form_data.mac.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.addr_type.label}</th>
        <td align=left>{$form_data.addr_type.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.password.label}</th>
        <td align=left>{$form_data.password.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.password_confirm.label}</th>
        <td align=left>{$form_data.password_confirm.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.lang.label}</th>
        <td align=left>{$form_data.lang.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.tz.label}</th>
        <td align=left>{$form_data.tz.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.arch.label}</th>
        <td align=left>{$form_data.arch.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.notify.label}</th>
        <td align=left>{$form_data.notify.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.targetpath.label}</th>
        <td align=left>{$form_data.targetpath.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.productid.label}</th>
        <td align=left>{$form_data.productid.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.orgname.label}</th>
        <td align=left>{$form_data.orgname.html}</td>
      </tr>
      <tr>
        <th align=right>{$form_data.licensemode.label}</th>
        <td align=left>{$form_data.licensemode.html}</td>
      </tr>
    </table>
    <table> 
    	<tr><td align=middle><center><input type=submit value="Done"></center></td></tr>
    </table>
  </form>
